import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>();

// Placeholder for the MCP server we will mount under /api later.
app.get('/api/health', (c) => c.json({ ok: true }));

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
