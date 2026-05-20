import {
  Dialog,
  List,
  ListButton,
  SearchField,
  SectionTitle,
  Shortcut,
} from '@cladd-ui/react';
import { useRouter } from 'next/router';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';

interface Heading {
  level: number;
  text: string;
  slug: string;
  /** Position in the page's heading tree.
   *  h2 → `[h2.text]`; h3 → `[parentH2.text, h3.text]`. */
  crumbs: string[];
}

interface IndexedPage {
  title: string;
  description: string;
  route: string;
  headings: Heading[];
}

interface SearchIndex {
  pages: IndexedPage[];
}

type Result =
  | { kind: 'page'; page: IndexedPage; score: number }
  | { kind: 'heading'; page: IndexedPage; heading: Heading; score: number };

// Module-level cache — the index never changes between mounts, no point
// re-fetching when the dialog opens a second time.
let cachedIndex: SearchIndex | null = null;
let inflight: Promise<SearchIndex> | null = null;

async function loadIndex(): Promise<SearchIndex> {
  if (cachedIndex) return cachedIndex;
  if (inflight) return inflight;
  inflight = fetch('/search-index.json')
    .then((res) => {
      if (!res.ok) throw new Error(`/search-index.json → ${res.status}`);
      return res.json() as Promise<SearchIndex>;
    })
    .then((data) => {
      cachedIndex = data;
      inflight = null;
      return data;
    })
    .catch((err) => {
      inflight = null;
      throw err;
    });
  return inflight;
}

// Score a query against a single field. Cheap weighted matcher tuned for the
// dataset size (~500 records, mostly short titles/headings):
//   - exact match: very high
//   - prefix:       high
//   - word-boundary substring (start of a word inside the field): mid
//   - any substring: low
// No subsequence fallback — that one was too generous and surfaced pages
// whose title/description happened to contain the query letters in order
// (e.g. searching "tool" matched "Button" via b-uTtOn-... in the
// description). Substring matches are tight enough to give useful fuzzy
// behavior without that noise.
function scoreField(query: string, field: string): number {
  if (!field) return 0;
  const q = query.toLowerCase();
  const f = field.toLowerCase();
  if (f === q) return 1000;
  if (f.startsWith(q)) return 500;
  // Word-boundary: query appears right after a space, hyphen, or slash.
  if (new RegExp(`(^|[\\s\\-/])${escapeRe(q)}`).test(f)) return 250;
  const idx = f.indexOf(q);
  if (idx !== -1) return 120 - Math.min(idx, 100);
  return 0;
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface WeightedField {
  text: string;
  weight: number;
}

// Best score for a single token across a list of (text, weight) fields.
function scoreToken(token: string, fields: WeightedField[]): number {
  let best = 0;
  for (const { text, weight } of fields) {
    const s = scoreField(token, text) * weight;
    if (s > best) best = s;
  }
  return best;
}

function scorePage(tokens: string[], page: IndexedPage): number {
  const fields: WeightedField[] = [
    { text: page.title, weight: 1.0 },
    { text: page.description, weight: 0.3 },
  ];
  let total = 0;
  for (const t of tokens) {
    const s = scoreToken(t, fields);
    if (s === 0) return 0; // every token must land somewhere
    total += s;
  }
  return total;
}

function scoreHeading(
  tokens: string[],
  page: IndexedPage,
  heading: Heading,
): number {
  // Fields that anchor a heading match: the heading text itself plus any
  // ancestor crumbs (e.g. matching "examples" against the parent h2).
  const headingFields: WeightedField[] = [
    { text: heading.text, weight: 1.0 },
    ...heading.crumbs.slice(0, -1).map((c) => ({ text: c, weight: 0.7 })),
  ];
  // Context fields are allowed to satisfy *other* tokens — they describe
  // where the heading lives but shouldn't be the sole reason it surfaces.
  const contextFields: WeightedField[] = [{ text: page.title, weight: 0.6 }];

  let total = 0;
  let headingAnchored = 0;
  for (const t of tokens) {
    const headingScore = scoreToken(t, headingFields);
    const contextScore = scoreToken(t, contextFields);
    const best = Math.max(headingScore, contextScore);
    if (best === 0) return 0;
    total += best;
    if (headingScore > 0) headingAnchored += 1;
  }
  // Require at least one token to hit the heading/crumbs directly. Without
  // this guard, a single-token query like "mcp" would return every heading
  // on the MCP page (since the page title satisfies "mcp" via context).
  if (headingAnchored === 0) return 0;
  return total;
}

function rankResults(query: string, index: SearchIndex): Result[] {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
  if (tokens.length === 0) return [];
  const results: Result[] = [];
  for (const page of index.pages) {
    const pS = scorePage(tokens, page);
    if (pS > 0) results.push({ kind: 'page', page, score: pS + 50 });
    const pageMatched = pS > 0;
    for (const heading of page.headings) {
      const hS = scoreHeading(tokens, page, heading);
      if (hS > 0) {
        // Stable tiebreaker: headings on a matching page edge slightly above
        // headings on unrelated pages, so "button size" keeps Button › Sizes
        // above Switch › Sizes.
        const boost = pageMatched ? 15 : 0;
        results.push({ kind: 'heading', page, heading, score: hS + boost });
      }
    }
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 40);
}

// Map a route to the bucket label the dialog groups it under. The route
// tells us everything — no need to bake categories into the index.
function categoryForPage(route: string): string {
  if (route.startsWith('/react/components/')) return 'Components';
  if (route.startsWith('/react/hooks/')) return 'Hooks';
  if (route.startsWith('/react/foundations/')) return 'Foundations';
  if (route === '/mcp/') return 'MCP';
  // /react/, /react/installation/**, /react/typescript/
  return 'Getting started';
}

// Order page-category groups appear in the result list. Components leads
// because that's what people search most; MCP last because it's a single
// page and rarely the target.
const CATEGORY_ORDER = [
  'Components',
  'Hooks',
  'Foundations',
  'Getting started',
  'MCP',
];

interface RenderGroup {
  title: string;
  items: Result[];
}

// Split the flat ranked list into the grouped layout the dialog renders:
//   1. Page results, sub-grouped by category, in CATEGORY_ORDER
//   2. "Sections" — every heading result except `## API Reference`
//   3. "API Reference" — pulled into its own bucket so users scanning for
//      props/types can jump straight there (and so the noisy duplicate
//      heading name doesn't clutter the Sections list)
// Items inside each group keep their score order from `rankResults`.
function groupResults(results: Result[]): RenderGroup[] {
  if (results.length === 0) return [];
  const out: RenderGroup[] = [];
  const pageBuckets = new Map<string, Result[]>();
  const sections: Result[] = [];
  const apiRefs: Result[] = [];
  for (const r of results) {
    if (r.kind === 'page') {
      const cat = categoryForPage(r.page.route);
      const bucket = pageBuckets.get(cat);
      if (bucket) bucket.push(r);
      else pageBuckets.set(cat, [r]);
      // Anything inside the API Reference subtree — the `## API Reference`
      // h2 itself, or any `###` directly below it — goes to the API bucket.
      // crumbs[0] is the top-most ancestor heading for the entry.
    } else if (r.heading.crumbs[0] === 'API Reference') {
      apiRefs.push(r);
    } else {
      sections.push(r);
    }
  }
  for (const cat of CATEGORY_ORDER) {
    const items = pageBuckets.get(cat);
    if (items?.length) out.push({ title: cat, items });
  }
  if (sections.length) out.push({ title: 'Sections', items: sections });
  if (apiRefs.length) out.push({ title: 'API Reference', items: apiRefs });
  return out;
}

// Render a heading row's breadcrumb as "Page › Section › Subsection". The
// parent path is dimmed so the matched leaf reads as the primary text;
// chevrons sit one step softer still so the segments visually separate
// without taking up extra space.
function Crumbs({ segments }: { segments: string[] }) {
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-x-2">
      {segments.map((s, i) => {
        const isLeaf = i === segments.length - 1;
        return (
          <span key={i} className="flex items-center gap-x-2">
            {i > 0 && (
              <span className="text-cladd-fg-softest" aria-hidden="true">
                ›
              </span>
            )}
            <span className={isLeaf ? '' : 'text-cladd-fg-softer'}>{s}</span>
          </span>
        );
      })}
    </span>
  );
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [index, setIndex] = useState<SearchIndex | null>(cachedIndex);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Lazy-load the index the first time the dialog opens. Subsequent opens
  // re-use the cached value.
  useEffect(() => {
    if (!open || index) return;
    let cancelled = false;
    loadIndex()
      .then((data) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open, index]);

  // Reset transient UI state on every open. Keep the query around between
  // opens? Probably not — fresh search each time matches the muscle memory
  // people have from VS Code / Linear / etc.
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIdx(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  const results = useMemo(
    () => (index ? rankResults(query, index) : []),
    [index, query],
  );

  // The visible order: groups concatenated in render order. activeIdx is a
  // position into this flat list, so ↑/↓ walks across groups seamlessly.
  const groups = useMemo(() => groupResults(results), [results]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  // Clamp the active index whenever the flat list shrinks (e.g. the user
  // types one more character and the previous selection no longer exists).
  useEffect(() => {
    if (activeIdx >= flat.length) setActiveIdx(0);
  }, [flat, activeIdx]);

  const go = useCallback(
    (r: Result) => {
      const href =
        r.kind === 'page' ? r.page.route : `${r.page.route}#${r.heading.slug}`;
      onOpenChange(false);
      router.push(href);
    },
    [router, onOpenChange],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (flat.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % flat.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + flat.length) % flat.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const r = flat[activeIdx];
      if (r) go(r);
    }
  };

  // Keep the active row scrolled into view as the user arrows through the
  // list. data-active="true" is set below; this picks up that node and
  // brings it into the viewport of the scrollable list container.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      aria-label="Search documentation"
      className="h-120 max-h-[80vh] w-[min(640px,calc(100vw-2rem))]! max-w-none!"
      contentClassName="flex flex-col gap-0 p-0"
    >
      <div className="mb-0 border-b border-cladd-outline p-2">
        <SearchField
          size="xl"
          inputRef={inputRef}
          value={query}
          inputClassName="text-sm font-normal"
          onChange={(v) => {
            setQuery(v);
            setActiveIdx(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search docs..."
        />
      </div>
      <div ref={listRef} className="overflow-auto pt-4 pb-0">
        {!index && !loadError && (
          <div className="px-2 py-8 text-center text-sm text-cladd-fg-softer">
            Loading…
          </div>
        )}
        {loadError && (
          <div className="px-2 py-8 text-center text-sm text-cladd-fg-softer">
            Couldn&apos;t load search index.
          </div>
        )}
        {index && !query && (
          <div className="flex flex-col gap-2 px-2 py-8 text-center text-sm text-cladd-fg-softer">
            <div>Search across {index.pages.length} pages.</div>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <Shortcut size="md">up</Shortcut>
              <Shortcut size="md">down</Shortcut>
              <span>to navigate</span>
              <Shortcut size="md">enter</Shortcut>
              <span>to open</span>
              <Shortcut size="md">esc</Shortcut>
              <span>to close</span>
            </div>
          </div>
        )}
        {index && query && flat.length === 0 && (
          <div className="px-2 py-8 text-center text-sm text-cladd-fg-softer">
            No results for &ldquo;{query}&rdquo;.
          </div>
        )}
        {groups.length > 0 && (
          <div className="flex flex-col gap-4">
            {(() => {
              // Track a running flat index across groups so each row can map
              // back to its position in `flat` for selection and click
              // handling without a second pass.
              let cursor = -1;
              return groups.map((group) => (
                <div key={group.title} className="flex flex-col gap-1">
                  <SectionTitle className="px-2">{group.title}</SectionTitle>
                  <List>
                    {group.items.map((r) => {
                      cursor += 1;
                      const i = cursor;
                      const isPage = r.kind === 'page';
                      const key = isPage
                        ? `page:${r.page.route}`
                        : `heading:${r.page.route}#${r.heading.slug}`;
                      return (
                        <ListButton
                          key={key}
                          size="lg"
                          selected={i === activeIdx}
                          onMouseEnter={() => setActiveIdx(i)}
                          onClick={() => go(r)}
                          data-active={i === activeIdx ? 'true' : undefined}
                          className="cursor-pointer text-[13px] font-medium"
                        >
                          {isPage ? (
                            r.page.title
                          ) : (
                            <Crumbs
                              segments={[r.page.title, ...r.heading.crumbs]}
                            />
                          )}
                        </ListButton>
                      );
                    })}
                  </List>
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    </Dialog>
  );
}
