# cladd-website

Documentation and marketing site for **[cladd](https://github.com/cladd-ui/cladd)** — an opinionated React UI kit for building real apps, editors, and dashboards.

Published at **[cladd.io](https://cladd.io)**.

> Looking for the kit itself? It lives in [`cladd-ui/cladd`](https://github.com/cladd-ui/cladd) and ships on npm as [`@cladd-ui/react`](https://www.npmjs.com/package/@cladd-ui/react). This repo is just the website.

## Stack

- **Next.js 16** (pages router) with `output: 'export'` — pure static export to `./out`.
- **Cloudflare Workers + Hono** serve the static export via the `ASSETS` binding. `/api/*` is reserved for an MCP server. Configured in `wrangler.jsonc`.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. No `tailwind.config.js` — config lives in `@theme` blocks in CSS.
- **MDX** docs via `@next/mdx`, with **rehype-pretty-code** + Shiki for syntax highlighting.
- **`@cladd-ui/react`** is installed from npm — the site is built with the same kit it documents.
- **TypeScript 6** strict mode. **oxfmt** for formatting. No ESLint.

## Layout

```
src/
  pages/           Next.js pages router — routes are .tsx + .mdx
  components/      Site chrome (SiteLayout, DocsLayout, …)
  generated/       Codegen output (prop tables, example sources, markdown docs)
  styles/          globals.css + code.css
  worker/          Hono Worker entry + generated worker-configuration.d.ts
  mdx-components.tsx
scripts/           Codegen + sitemap scripts
public/            Static assets
wrangler.jsonc     Worker + Assets binding config
next.config.mjs    output: 'export', MDX + rehype-pretty-code wiring
```

## Development

```bash
npm install
npm run dev          # Next dev server (Turbopack)
```

The dev script runs `codegen` first — it pulls the changelog from the kit repo, extracts prop tables and example sources from `@cladd-ui/react`, generates the markdown mirror of every doc page, and writes `llms.txt`. Re-runs automatically on `dev` and `build`.

## Other commands

```bash
npm run build        # Static export → ./out (also rebuilds sitemap)
npm run worker:dev   # Build, then `wrangler dev` (Worker + assets locally)
npm run cf-typegen   # Regenerate src/worker/worker-configuration.d.ts after wrangler.jsonc changes
npm run check-types  # tsc --noEmit
npm run format       # oxfmt
```

## Deploy

Deploys are run manually:

```bash
npm run build && wrangler deploy
```

There's no `deploy` npm script on purpose — the two-step makes it harder to push the site by accident.

## Contributing

Issues and PRs welcome. For doc-content fixes (typos, clarifications, missing examples), just open a PR. For larger restructuring or new sections, open an issue first so we can sort out scope.

When editing pages:

- Use real cladd primitives (`Surface`, `SurfaceCut`, `Toolbar`, etc.) rather than hand-rolled CSS that mimics them.
- Cross-link component mentions to their docs page: `[Toolbar](/react/components/toolbar/)`. Trailing slash required.
- 2× spacing scale — prefer `p-2`, `p-4`, `p-8`, `gap-2`, etc. over odd intermediates.
- Run `npm run format` before committing.

See [CLAUDE.md](./CLAUDE.md) for the full repo conventions.

## License

MIT
