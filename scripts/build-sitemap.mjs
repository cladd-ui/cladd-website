#!/usr/bin/env node
// Generate out/sitemap.xml by walking src/pages/ for .tsx/.mdx routes.
// Runs after `next build` so the file lands inside the static export and
// gets served by the Worker's ASSETS binding at /sitemap.xml.

import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagesRoot = resolve(projectRoot, 'src/pages');
const outFile = resolve(projectRoot, 'out/sitemap.xml');

const SITE_ORIGIN = 'https://cladd.io';

// Files / dirs we never emit as URLs.
const PAGE_EXTS = new Set(['.tsx', '.ts', '.mdx', '.md']);
const SKIP_BASENAMES = new Set(['_app', '_document', '_error', '404', '500']);

function walk(dir, routes) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, routes);
      continue;
    }
    // Skip dynamic routes — we have none today, but a sitemap of literal
    // [slug] paths is worse than nothing.
    if (entry.startsWith('[')) continue;

    const dot = entry.lastIndexOf('.');
    if (dot < 0) continue;
    const ext = entry.slice(dot);
    if (!PAGE_EXTS.has(ext)) continue;
    const base = entry.slice(0, dot);
    if (SKIP_BASENAMES.has(base)) continue;

    const rel = full.slice(pagesRoot.length).replace(/\\/g, '/');
    // /react/components/button.mdx → /react/components/button
    // /react/index.mdx           → /react
    // /index.tsx                 → /
    let route = rel.slice(0, -ext.length);
    if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
    if (route === '') route = '/';

    // Trailing slash to match next.config.mjs (trailingSlash: true).
    const path = route === '/' ? '/' : `${route}/`;
    routes.push({ path, mtime: stat.mtime });
  }
}

// Higher priority for the landing page, slightly lower for top-level docs hubs,
// the rest defaults to 0.7.
function priorityFor(path) {
  if (path === '/') return '1.0';
  if (path === '/react/') return '0.9';
  if (/^\/react\/(components|foundations|hooks)\/$/.test(path)) return '0.8';
  return '0.7';
}

function changefreqFor(path) {
  if (path === '/') return 'weekly';
  return 'monthly';
}

const routes = [];
walk(pagesRoot, routes);
routes.sort((a, b) => a.path.localeCompare(b.path));

const urls = routes
  .map(({ path, mtime }) => {
    return `  <url>
    <loc>${SITE_ORIGIN}${path}</loc>
    <lastmod>${mtime.toISOString()}</lastmod>
    <changefreq>${changefreqFor(path)}</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`;
  })
  .join('\n');

const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

if (!existsSync(dirname(outFile))) {
  console.error(
    `[build-sitemap] ${dirname(outFile)} does not exist — run \`next build\` first.`,
  );
  process.exit(1);
}

writeFileSync(outFile, content);
console.log(`[build-sitemap] wrote ${routes.length} urls → ${outFile}`);
