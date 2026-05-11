import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>();

// Placeholder for the MCP server we will mount under /api later.
app.get('/api/health', (c) => c.json({ ok: true }));

// Everything else falls through to the static export served by Workers Assets.
// The ASSETS binding labels .md files as `text/markdown` without a charset,
// which makes browsers fall back to Windows-1252 and turn our em-dashes into
// `â€"`. Re-tag .md responses as UTF-8 so the source renders correctly when
// opened directly in the browser.
app.all('*', async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw);
  if (!c.req.path.endsWith('.md')) return res;
  const headers = new Headers(res.headers);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
});

export default app;
