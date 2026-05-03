import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>();

// Placeholder for the MCP server we will mount under /api later.
app.get('/api/health', (c) => c.json({ ok: true }));

// Everything else falls through to the static export served by Workers Assets.
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
