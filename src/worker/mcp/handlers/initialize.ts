import type { InitializeParams, InitializeResult, Tool } from '../types';

// Persistent guidance surfaced to the client on connect. This is where the
// cladd-specific rules live — the kit's positioning, the tokens and primitives
// agents should reach for, and the "consult the screenshot when unsure" rule.
const INSTRUCTIONS = `cladd is an opinionated React UI kit (\`@cladd-ui/react\`) for
building real apps, editors, and dashboards — not a landing-page kit, not
a headless primitives library. Dark-first by default, surface-based, with
eleven accent tokens and a unified 2xs → 2xl size scale.

When writing cladd code:
- Reach for real cladd primitives — \`Surface\`, \`SurfaceCut\`, \`Button\`,
  \`Toolbar\`, \`List\`, \`Chip\`, \`Shortcut\`, etc. — not hand-rolled CSS
  that mimics them.
- Use the cladd Tailwind tokens: \`bg-cladd-bg\`, \`bg-cladd-surface\`,
  \`bg-cladd-surface-cut\`, \`bg-cladd-surface-minus\`, \`bg-cladd-surface-plus\`,
  \`text-cladd-fg\`, \`text-cladd-fg-soft\` / \`fg-softer\` / \`fg-softest\`,
  \`border-cladd-outline\`, \`text-cladd-primary\`. Do not invent suffixes
  (no \`surface-2\`, no \`fg-2\`).
- Components share a consistent size scale across \`Button\`, \`Chip\`,
  \`Shortcut\`, \`Spinner\`. Nesting one inside another with the same
  \`size\` token keeps proportions right.
- Default to \`md\` for app UI; reach for \`lg\` for primary inputs and
  hero CTAs. Avoid \`2xs\` and \`xs\` — they are reserved for elements
  nested **inside** a denser container (a clear button inside an
  \`Input\`, a \`⌘K\` hint inside a \`SearchField\`). At \`2xs\` a
  \`Chip\` / \`Shortcut\` / \`Spinner\` is only 8 px tall, which is
  unreadable as a standalone control. Never pick \`2xs\` or \`xs\` for
  a chip, shortcut, or button that stands on its own row.
- For a new cladd app (or when you're new to the kit), the first call
  should be \`get_foundation('quickstart')\` — it shows the minimum
  app shell (\`CladdProvider\` + \`Toolbar\` + sidebar \`List\` + content
  \`Surface\`) and the "reach for primitives, not divs" mapping. Read
  \`get_foundation('surfaces')\` and \`get_foundation('sizing')\` next —
  they encode the conventions that make cladd code feel native vs.
  generic.
- Icons: cladd is icon-agnostic — it ships no icon set. Use the host
  project's existing icon library (e.g. \`lucide-react\`,
  \`@heroicons/react\`, custom SVG components). Where a component takes
  an explicit \`icon\` prop (e.g. \`Chip\`), pass the component itself:
  \`icon={CheckIcon}\`. Elsewhere (\`Button\`, \`Toolbar\` items),
  render the icon as a child: \`<Button><PlusIcon />Add</Button>\`.
  Doc examples reference \`PlusIcon\` / \`CheckIcon\` as placeholders —
  they are not a specific package; substitute the host project's icons.
- Icon sizing is automatic — do NOT put \`size-*\` (e.g. \`size-3.5\`)
  on \`<svg>\` children inside \`Button\` or \`Chip\`. Both components
  apply a size-matched glyph dimension to direct SVG children (Button:
  12 px at \`2xs\`/\`xs\`, 16 px elsewhere; Chip: 6 → 16 px across the
  scale). A plain Tailwind \`size-3.5\` class on the icon does
  nothing because the parent's selector wins — only \`size-3.5!\` would
  override, and the kit's mapping is the right call at every step.
  Pass the correct \`size\` to the parent and the icon follows.
- Never reinvent primitives with styled divs: a row of buttons is a
  \`Toolbar\`, a tag is a \`Chip\`, a vertical menu is a \`List\` (with
  \`ListButton\`), a kbd glyph is a \`Shortcut\`, a panel or card is a
  \`Surface\`. If you reach for
  \`<div className="bg-cladd-surface border rounded-*">\`, you wanted
  a \`Surface\`.
- \`SurfaceCut\` never nests inside another \`SurfaceCut\` — recessed-
  on-recessed produces no visible depth and reads as broken. To lift
  a panel above a recessed parent, use \`surfaceLevel="+1"\` on a
  regular \`Surface\`, not another cut.
- Don't override heights with \`h-*\` / \`size-*\` Tailwind utilities
  on sized cladd components. The component already honours \`size\`
  through \`h-cladd-*\` classes; stacking \`h-7\` on top fights the
  scale and breaks the nesting math.
- One accent per row. Pick one app accent (\`brand\`), plus at most
  one semantic accent on the loud action (a green \`Publish\`, a red
  \`Delete\`). Three accents in a single toolbar reads as generic.
- For the full kit-wide anti-pattern list, read
  \`get_foundation('pitfalls')\`.

Tools exposed here:
- \`list_components\` — directory of all components, foundations, and hooks
  with one-line descriptions. Cheap; call this first to narrow.
- \`get_component(slug)\` — full Markdown reference for one component:
  prose, every example's code, props table, and screenshot URLs.
- \`get_foundation(slug)\` — same shape for the foundation pages
  (\`quickstart\`, \`surfaces\`, \`colors\`, \`sizing\`, \`pitfalls\`).
- \`get_hook(slug)\` — same shape for the six hooks (\`use-dialog\`,
  \`use-toast\`, \`use-theme\`, \`use-surface\`, \`use-device\`,
  \`use-accent-color\`).
- \`search(query)\` — substring search across the catalog when the slug
  isn't obvious.

Visuals are first-class — cladd has a defined visual identity (recessed
surfaces, subtle gradients, accent rings) that is easy to misread from
prop names alone, and visually-generic output is the failure mode this
kit cares most about.

\`get_component\` and \`get_foundation\` responses include the doc's
overview screenshot as an inline image content block. Look at it before
committing to a layout — the visual is the spec, not the prop names.
Each example in the markdown also carries its own screenshot URL
(\`https://cladd.io/screenshots/<section>/<slug>/<example>.png\`); fetch
those for any non-trivial composition, when picking between variants
(e.g. \`solid\` vs \`gradient\` vs \`transparent\`), or whenever the
prop table alone leaves ambiguity. Generating cladd UI without
consulting the screenshots almost always produces structurally correct
code that looks generic.`;

const tools: Tool[] = [
  {
    name: 'list_components',
    description:
      'List every cladd component, foundation, and hook with a one-line description. Optionally filter by kind. Always call this first when you do not already know the exact slug — it is the cheapest way to find what cladd ships.',
    inputSchema: {
      type: 'object',
      properties: {
        kind: {
          type: 'string',
          enum: ['component', 'foundation', 'hook'],
          description:
            'Restrict the result to one kind. Omit to return everything.',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_component',
    description:
      'Return the full Markdown reference for one cladd component: prose, every example code block, the props table, and inline screenshot URLs for each example.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description:
            'Kebab-case component slug (e.g. "button", "surface-cut", "number-field"). Get the canonical list via list_components.',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'get_foundation',
    description:
      'Return the full Markdown reference for one of the cladd foundation pages. These cover concepts that touch every component — read them early when generating non-trivial cladd code. For a new app, start with "quickstart"; before shipping non-trivial output, read "pitfalls".',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          enum: ['quickstart', 'surfaces', 'colors', 'sizing', 'pitfalls'],
          description:
            'Foundation slug: "quickstart" (CladdProvider + minimum app shell + primitive-vs-div mapping — read this first for a new app), "surfaces" (depth model, levels, tokens), "colors" (accent palette, text shades, OKLCH retuning), "sizing" (2xs→2xl scale, density rules), or "pitfalls" (kit-wide anti-patterns and what to reach for instead).',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'get_hook',
    description:
      'Return the Markdown reference for one cladd hook (useDialog, useToast, useTheme, useSurface, useDevice, useAccentColor).',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description:
            'Kebab-case hook slug (e.g. "use-dialog", "use-toast", "use-theme").',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'search',
    description:
      'Substring search across components, foundations, and hooks by name, slug, and description. Use this when the right slug is not obvious from list_components.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description:
            'Free-text query. Multi-word queries require every word to appear somewhere in the entry.',
        },
        kind: {
          type: 'string',
          enum: ['component', 'foundation', 'hook'],
          description: 'Optional kind filter, same values as list_components.',
        },
      },
      required: ['query'],
    },
  },
];

export function handleInitialize(params: InitializeParams): InitializeResult {
  return {
    protocolVersion: params.protocolVersion || '2024-11-05',
    capabilities: {
      tools: { listChanged: false },
      resources: { listChanged: false, subscribe: false },
    },
    serverInfo: {
      name: 'cladd-mcp-server',
      version: '1.0.0',
    },
    instructions: INSTRUCTIONS,
  };
}

export function getTools(): Tool[] {
  return tools;
}
