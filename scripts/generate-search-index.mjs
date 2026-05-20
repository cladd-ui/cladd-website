#!/usr/bin/env node
// Build a flat search index for the ⌘K dialog.
//
// Walks every MDX page that should be searchable (everything under
// src/pages/react plus src/pages/mcp.mdx) and emits one JSON record per
// page + one per top-level heading. The static export copies the file from
// public/ to /out, so the worker serves it at /search-index.json and the
// dialog fetches it lazily on first open.
//
// Per page we extract:
//   - title and description from the <DocsLayout> or <PageLayout> opener
//     (the same attributes the markdown-twin generator reads).
//   - h2/h3 headings from the body, fence-aware so `## inside code` is
//     ignored. Each heading is slugged with github-slugger so its anchor
//     matches the id rehype-slug stamps onto the rendered page.

import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import GithubSlugger from 'github-slugger';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const reactPagesRoot = resolve(projectRoot, 'src/pages/react');
const mcpPage = resolve(projectRoot, 'src/pages/mcp.mdx');
const outPath = resolve(projectRoot, 'public/search-index.json');

const sources = [
  ...collectMdxFiles(reactPagesRoot),
  ...(existsSync(mcpPage) ? [mcpPage] : []),
].sort();

const pages = [];
for (const file of sources) {
  const raw = readFileSync(file, 'utf8');
  const meta = parseLayoutMeta(raw);
  if (!meta.title) continue;
  pages.push({
    title: meta.title,
    description: meta.description ?? '',
    route: pagePath(file),
    headings: parseHeadings(raw),
  });
}

writeFileSync(outPath, JSON.stringify({ pages }) + '\n');
console.log(
  `[generate-search-index] wrote ${pages.length} pages → ${relative(projectRoot, outPath)}`,
);

// ---------------------------------------------------------------------------

function collectMdxFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectMdxFiles(full));
    } else if (entry.endsWith('.mdx')) {
      out.push(full);
    }
  }
  return out;
}

// Lift `title` / `description` out of the layout opener. Each MDX page is
// wrapped in either <DocsLayout …> or <PageLayout …> and the attributes are
// always plain double-quoted strings — same shape generate-markdown-docs.mjs
// reads.
function parseLayoutMeta(raw) {
  const m = raw.match(/<(DocsLayout|PageLayout)([\s\S]*?)>/);
  if (!m) return { title: null, description: null };
  const attrs = m[2];
  const title = attrs.match(/\btitle\s*=\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? null;
  const description =
    attrs.match(/\bdescription\s*=\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? null;
  return {
    // Strip the " — Cladd" suffix every page tacks onto <title>.
    title: title ? title.replace(/\s+[—-]\s+Cladd$/, '').trim() : null,
    description: description ? description.trim() : null,
  };
}

// Pull h2/h3 headings from the MDX body. Skips fenced code blocks so that
// ```md
// ## not a heading
// ``` doesn't leak. Slugs are produced by github-slugger so they match the
// ids rehype-slug renders on the live page — the dialog can navigate
// straight to `<route>#<slug>`.
//
// Each heading also gets a `crumbs` array describing its position in the
// page's structure (used by the dialog to render breadcrumbs like
// "Page › H2 › H3"): for an h2 it's just `[h2.text]`, for an h3 it's
// `[parentH2.text, h3.text]`. The dialog prepends the page title at render
// time so the index stays page-agnostic.
function parseHeadings(raw) {
  const lines = raw.split('\n');
  const out = [];
  const slugger = new GithubSlugger();
  let inFence = false;
  let fenceMarker = '';
  let lastH2Text = null;
  for (const line of lines) {
    const fence = line.match(/^(```+|~~~+)/);
    if (fence) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fence[1];
      } else if (line.startsWith(fenceMarker)) {
        inFence = false;
        fenceMarker = '';
      }
      continue;
    }
    if (inFence) continue;
    const h = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!h) continue;
    const level = h[1].length;
    const text = stripInlineMarkdown(h[2]);
    if (!text) continue;
    const slug = slugger.slug(text);
    if (level === 2) {
      lastH2Text = text;
      out.push({ level, text, slug, crumbs: [text] });
    } else {
      out.push({
        level,
        text,
        slug,
        crumbs: lastH2Text ? [lastH2Text, text] : [text],
      });
    }
  }
  return out;
}

// Heading text can contain inline markdown (`code`, **bold**, [links]).
// Strip the syntax so search matches on the visible string.
function stripInlineMarkdown(s) {
  return s
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
}

// next-export with trailingSlash: true serves pages at /<route>/. Mirror
// that so search results link to the canonical URL.
function pagePath(file) {
  // mcp.mdx lives at src/pages/mcp.mdx → /mcp/
  if (file === mcpPage) return '/mcp/';
  const rel = relative(reactPagesRoot, file).replace(/\.mdx$/, '');
  const route =
    rel === 'index'
      ? ''
      : rel.endsWith('/index')
        ? rel.slice(0, -'/index'.length)
        : rel;
  return '/react/' + (route ? route + '/' : '');
}
