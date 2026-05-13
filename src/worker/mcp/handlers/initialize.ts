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
- Read \`get_foundation('surfaces')\` and \`get_foundation('sizing')\`
  early — they encode the conventions that make cladd code feel native
  vs generic.

Tools exposed here:
- \`list_components\` — directory of all components, foundations, and hooks
  with one-line descriptions. Cheap; call this first to narrow.
- \`get_component(slug)\` — full Markdown reference for one component:
  prose, every example's code, props table, and screenshot URLs.
- \`get_foundation(slug)\` — same shape for the foundation pages
  (\`surfaces\`, \`colors\`, \`sizing\`).
- \`get_hook(slug)\` — same shape for the six hooks (\`use-dialog\`,
  \`use-toast\`, \`use-theme\`, \`use-surface\`, \`use-device\`,
  \`use-accent-color\`).
- \`search(query)\` — substring search across the catalog when the slug
  isn't obvious.

Each example in a doc carries an inline screenshot URL
(\`https://cladd.io/screenshots/<section>/<slug>/<example>.png\`). If you
are unsure how a component looks in practice, fetch the screenshot before
committing to a layout — cladd has a defined visual identity (recessed
surfaces, subtle gradients, accent rings) that is easy to misread from
prop names alone.`;

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
      'Return the full Markdown reference for one of the three cladd foundation pages. These cover concepts that touch every component — read them early when generating non-trivial cladd code.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          enum: ['surfaces', 'colors', 'sizing'],
          description:
            'Foundation slug: "surfaces" (depth model, levels, tokens), "colors" (accent palette, text shades, OKLCH retuning), or "sizing" (2xs→2xl scale, density rules).',
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
