// Shared fetcher for the get_* tools and the resources/read handler. Pulls
// the prebuilt Markdown twin from the ASSETS binding — the same file a
// browser would receive when hitting /react/<section>/<slug>.md — and,
// when available, the doc's first ("overview") screenshot from
// /screenshots/<section>/<slug>/<file>.png.
//
// Two outputs share this loader:
//   - `fetchDoc()` wraps the result as a ToolCallResult (used by the
//     get_component / get_foundation / get_hook tools).
//   - `loadDoc()` returns a neutral { markdown, image? } shape used by the
//     resources/read handler to build a ReadResourceResult.

import { MCP_CATALOG, type CatalogKind } from '../../../generated/mcp-catalog';
import type { ToolCallResult, ToolContent } from '../types';

interface FetchOpts {
  kind: CatalogKind;
  section: 'components' | 'foundations' | 'hooks';
  slug: string;
  assets: { fetch: (request: Request | string) => Promise<Response> };
  baseUrl: string;
}

export interface DocImage {
  /** Base64-encoded PNG bytes, no data: prefix. */
  data: string;
  mimeType: string;
}

export interface LoadDocSuccess {
  ok: true;
  markdown: string;
  image?: DocImage;
}

export interface LoadDocError {
  ok: false;
  error: string;
}

export type LoadDocResult = LoadDocSuccess | LoadDocError;

const FIRST_SCREENSHOT_RE = /!\[[^\]]*\]\(([^)]+\/screenshots\/[^)]+\.png)\)/i;

/**
 * Load a doc and (when available) its overview screenshot in a transport-
 * neutral shape. Both the tool-call path and the resources/read path call
 * into this; each wraps the result for its own response shape.
 */
export async function loadDoc(opts: FetchOpts): Promise<LoadDocResult> {
  const { kind, section, slug, assets, baseUrl } = opts;
  const entry = MCP_CATALOG.find((e) => e.kind === kind && e.slug === slug);
  if (!entry) {
    const known = MCP_CATALOG.filter((e) => e.kind === kind)
      .map((e) => e.slug)
      .join(', ');
    return {
      ok: false,
      error: `Unknown ${kind} slug: "${slug}". Known slugs: ${known}.`,
    };
  }

  const url = new URL(`/react/${section}/${slug}.md`, baseUrl).toString();
  let res: Response;
  try {
    res = await assets.fetch(url);
  } catch (err) {
    return {
      ok: false,
      error: `Failed to fetch ${section}/${slug}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
  if (!res.ok) {
    return {
      ok: false,
      error: `Doc not found: ${section}/${slug} (status ${res.status})`,
    };
  }
  const markdown = await res.text();

  // Best-effort screenshot enrichment — hooks pages and any page without a
  // <Foo Example /> reference simply have no image. Failures degrade to a
  // markdown-only result.
  const screenshotPath = extractFirstScreenshotPath(markdown);
  let image: DocImage | undefined;
  if (screenshotPath) {
    image =
      (await fetchScreenshotImage(screenshotPath, assets, baseUrl)) ??
      undefined;
  }

  return { ok: true, markdown, image };
}

/**
 * Tool-call wrapper around `loadDoc`. Returns markdown as a text content
 * block and (when present) the overview screenshot as an image block.
 */
export async function fetchDoc(opts: FetchOpts): Promise<ToolCallResult> {
  const result = await loadDoc(opts);
  if (!result.ok) {
    return {
      content: [
        { type: 'text', text: JSON.stringify({ error: result.error }) },
      ],
      isError: true,
    };
  }
  const content: ToolContent[] = [{ type: 'text', text: result.markdown }];
  if (result.image) {
    content.push({
      type: 'image',
      data: result.image.data,
      mimeType: result.image.mimeType,
    });
  }
  return { content };
}

function extractFirstScreenshotPath(markdown: string): string | null {
  const match = markdown.match(FIRST_SCREENSHOT_RE);
  if (!match) return null;
  try {
    // Markdown URLs may be absolute (https://cladd.io/screenshots/…) or
    // root-relative (/screenshots/…). new URL with a fallback base gives
    // us a consistent pathname either way.
    return new URL(match[1], 'https://cladd.io/').pathname;
  } catch {
    return null;
  }
}

async function fetchScreenshotImage(
  pathname: string,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string,
): Promise<DocImage | null> {
  try {
    const url = new URL(pathname, baseUrl).toString();
    const res = await assets.fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const mimeType = (res.headers.get('content-type') ?? 'image/png')
      .split(';')[0]
      .trim();
    return {
      data: arrayBufferToBase64(buf),
      mimeType,
    };
  } catch {
    return null;
  }
}

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  // Chunk to avoid `Maximum call stack size exceeded` on String.fromCharCode
  // with very large argument lists.
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }
  return btoa(binary);
}
