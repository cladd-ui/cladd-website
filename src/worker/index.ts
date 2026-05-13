import { Hono } from 'hono';

import { mcpApp } from './mcp';

const app = new Hono<{ Bindings: Env }>();

app.get('/api/health', (c) => c.json({ ok: true }));

// MCP server — JSON-RPC at /mcp. The docs page for the server lives at
// the same path (static export at /mcp/index.html); see src/worker/mcp/index.ts
// for how GET / forwards to ASSETS so the page still serves.
app.route('/mcp', mcpApp);

// Everything else falls through to the static export served by Workers Assets.
// The ASSETS binding labels .md and .txt files without a charset, which makes
// browsers fall back to Windows-1252 and turn our em-dashes into `â€"`. Re-tag
// those responses as UTF-8 so the source renders correctly when opened
// directly in the browser.
app.all('*', async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw);
  const path = c.req.path;
  let contentType: string | null = null;
  if (path.endsWith('.md')) contentType = 'text/markdown; charset=utf-8';
  else if (path.endsWith('.txt')) contentType = 'text/plain; charset=utf-8';
  if (!contentType) return res;
  const headers = new Headers(res.headers);
  headers.set('Content-Type', contentType);
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
});

export default app;
