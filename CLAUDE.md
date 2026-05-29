# cladd-website

Documentation and marketing site for **cladd** — published at [cladd.io](https://cladd.io). Source for the kit itself lives at [github.com/cladd-ui/cladd](https://github.com/cladd-ui/cladd).

## What cladd is

cladd is an **opinionated React UI kit for building real apps, editors, and dashboards** — not a landing-page kit, not a headless primitives library.

Don't describe it as "primitives", "unstyled", or "building blocks for your own design system". It is none of those. Closer in spirit to Mantine or Material UI than to Radix or Base UI — but more authored, with a defined visual identity (recessed/cut surfaces, subtle gradients, dark-first, blue accent baked in by default).

The core design principle: **dense but not crowded.** cladd targets information-rich UIs where you need a lot on screen and it has to stay legible. Editor sidebars, kanban boards, settings panels, design-tool inspectors. When writing copy, designing demos, or laying out pages on this site, embody that — pack the screen, but keep it breathable. The site itself should feel like a cladd app, not a sparse marketing page.

What's actually in the kit:

- **Surface system.** `Surface`, `SurfaceCut`, levels 1–5, contextual nesting via `useSurface`.
- **Sizing scale.** Every interactive control supports `2xs → 2xl` consistently — Button, Input, NumberField, OTPField, Switch, Slider, Chip, Shortcut.
- **Eleven accent colors** × multiple variants (transparent, solid, gradient, solid-fill, gradient-fill).
- **Application-grade controls** — Toolbar, Segmented, Shortcut (kbd glyphs), OTPField, NumberField, Select — the boring app-shell parts, not just buttons and dialogs.
- **Hooks** for the imperative bits: `useDialog`, `useToast`, `useTheme`, `useSurface`, `useDevice`.

Already powering production apps: **Swiper Studio**, **t0ggles**, **PaneFlow**, **Start Page HQ**. Mention these when discussing adoption.

## Naming

The framework is **cladd** — lowercase. Always lowercase mid-sentence ("built with cladd", "cladd ships with…"). Capitalize as **Cladd** only when it starts a sentence — sentence-case applies normally there. Don't write CLADD (all-caps) or Cladd mid-sentence. The npm package is `@cladd-ui/react`; the org/repo is `cladd-ui`.

## Stack

- **Next.js 16** with the **pages router** and `output: 'export'` (pure static export to `./out`).
- **Cloudflare Workers + Hono** at `src/worker/index.ts` serves the static export via the `ASSETS` binding. `/api/*` is reserved for an MCP server we'll add later. Configured in `wrangler.jsonc` (`run_worker_first: true`).
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js` — config lives in `@theme` blocks inside CSS).
- **MDX** docs via `@next/mdx`, with **rehype-pretty-code** + Shiki for syntax highlighting. Plugins are passed as **module-specifier strings** in `next.config.mjs` because Next 16's Turbopack requires JSON-serializable loader options.
- **`@cladd-ui/react`** is installed from npm (not as a `file:../cladd/src` workspace dep — Turbopack can't resolve the source-export package through that path). When the local cladd lib gets new versions, bump and reinstall.
- **Fonts** (Geist, Geist Mono): plain Google Fonts `<link>` in `_document.tsx`. **Do not use `next/font`.** The Tailwind theme maps `--font-sans` / `--font-mono` to the family names directly.
- **TypeScript 6** strict mode. **No ESLint or other linter.**
- **oxfmt** for formatting (`npm run format`). Wrangler types via `npm run cf-typegen` (writes `src/worker/worker-configuration.d.ts`).

## Layout

```
src/
  pages/           Next.js pages router. Routes are .tsx + .mdx. Trailing slashes on (static export).
  components/      Site chrome (SiteLayout, DocsLayout). Imported via `@/...`.
  styles/          globals.css + code.css (syntax-highlighting integration).
  worker/          Hono Worker entry + generated worker-configuration.d.ts.
  mdx-components.tsx  MDX element overrides (e.g. <pre> wrapped in cladd <SurfaceCut>).
wrangler.jsonc     Worker + Assets binding config.
next.config.mjs    output: 'export', MDX + rehype-pretty-code wiring.
```

## Conventions specific to this repo

- **Use real cladd primitives wherever possible**, not CSS that mimics them. Code blocks, for example, are wrapped in `<SurfaceCut>` via `mdx-components.tsx` — not styled with hand-rolled border/background classes. Same goes for layouts: prefer `Surface`, `SurfaceCut`, `Toolbar`, `SectionTitle`, etc., over plain divs.
- **Use the actual cladd Tailwind color tokens.** The exposed ones are: `bg-cladd-bg`, `bg-cladd-surface`, `bg-cladd-surface-cut`, `bg-cladd-surface-minus`, `bg-cladd-surface-plus`, `text-cladd-fg`, `text-cladd-fg-soft`/`fg-softer`/`fg-softest`, `border-cladd-outline`, `text-cladd-primary`. Don't invent suffixes (no `surface-2`, no `fg-2`) — they don't exist.
- **Trailing slashes everywhere** — `output: 'export'` requires `trailingSlash: true` to keep links working from the worker's static asset binding.
- **2x-grid spacing.** For Tailwind `p-*`, `gap-*`, `m-*`, and other spacing-scale props, prefer powers-of-two values: `1`, `2`, `4`, `8`, `16`. Avoid odd intermediates like `3`, `5`, `6`, `7`, `10` unless there's a specific reason. Same goes for sizes (`size-*`, `w-*`, `h-*`).
- **Cross-link component mentions in docs.** Whenever an MDX page mentions another cladd component by name — in prose or in a backtick code reference — link it to its docs page: `[`Toolbar`](/react/components/toolbar/)`, `[`Surface`](/react/components/surface/)`, etc. Path is always `/react/components/<kebab-name>/` (trailing slash required). Skip self-references (don't link `Surface` on the Surface page) and don't re-link every occurrence — the first mention per section is enough.
- **Doc-page meta descriptions stay purpose-only.** The `description` passed to `DocsLayout` is a single short sentence about _what the thing is for_, not how it works. Don't mention `CladdProvider`, context, "published by", `useContext`, user-agent parsing, or other implementation details. Match the existing component-page style: "Compact label for tags, statuses, and inline metadata.", "Modal window for confirms, alerts, and short focused flows.", "Read whether the app is in dark or light mode."

## Commands

```bash
npm run dev          # Next dev server (Turbopack)
npm run build        # Static export → ./out
npm run worker:dev   # Build, then `wrangler dev` (Worker + assets locally)
npm run cf-typegen   # Regenerate src/worker/worker-configuration.d.ts after wrangler.jsonc changes
npm run check-types  # tsc --noEmit
npm run format       # oxfmt
```

Deploys are run manually from the user's machine (no `deploy` script — was removed intentionally). To deploy: `next build && wrangler deploy`.
