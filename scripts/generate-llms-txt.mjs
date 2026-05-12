#!/usr/bin/env node
// Generate public/llms.txt — the AI-agent-friendly index of the docs, in the
// shape pioneered by llmstxt.org and used by shadcn/ui and Base UI.
//
// Each entry points at the plain-Markdown twin of the page (the .md files
// produced by generate-markdown-docs.mjs), which is what an agent actually
// wants to ingest — pre-rendered prose, YAML frontmatter, no JSX.
//
// Section order is intentionally Foundations → Components → Hooks. The
// foundations (surfaces, colors, sizing) are the keys to using the kit
// correctly, so agents see them before the long component list.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagesRoot = resolve(projectRoot, 'src/pages/react');
const outFile = resolve(projectRoot, 'public/llms.txt');

const SITE_ORIGIN = 'https://cladd.io';

// Mirror of DocsLayout's sidebar order, with Foundations promoted above
// Components. Each entry maps a doc route to its MDX source so we can pull
// the page description straight out of the <DocsLayout> tag.
const componentNames = [
  'Backdrop',
  'Button',
  'Checkbox',
  'Chip',
  'Dialog',
  'Input',
  'Link',
  'List',
  'NumberField',
  'NumberScrubber',
  'OTPField',
  'Popover',
  'Popup',
  'Radio',
  'SearchField',
  'SectionTitle',
  'Segmented',
  'Select',
  'Shortcut',
  'Slider',
  'Spinner',
  'Surface',
  'SurfaceCut',
  'Switch',
  'Textarea',
  'Toast',
  'Toolbar',
  'Tooltip',
  'CladdProvider',
];

const hookNames = [
  'useTheme',
  'useAccentColor',
  'useSurface',
  'useDevice',
  'useDialog',
  'useToast',
];

function toKebab(s) {
  return s
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const sections = [
  {
    title: 'Getting started',
    entries: [
      { mdx: 'index.mdx', md: '/react/index.md', label: 'Introduction' },
      {
        mdx: 'installation.mdx',
        md: '/react/installation.md',
        label: 'Installation',
      },
      {
        mdx: 'typescript.mdx',
        md: '/react/typescript.md',
        label: 'TypeScript',
      },
    ],
  },
  {
    title: 'Installation',
    entries: [
      {
        mdx: 'installation/next.mdx',
        md: '/react/installation/next.md',
        label: 'Next.js',
      },
      {
        mdx: 'installation/vite.mdx',
        md: '/react/installation/vite.md',
        label: 'Vite',
      },
      {
        mdx: 'installation/tanstack-start.mdx',
        md: '/react/installation/tanstack-start.md',
        label: 'TanStack Start',
      },
      {
        mdx: 'installation/react-router.mdx',
        md: '/react/installation/react-router.md',
        label: 'React Router',
      },
      {
        mdx: 'installation/astro.mdx',
        md: '/react/installation/astro.md',
        label: 'Astro',
      },
      {
        mdx: 'installation/manual.mdx',
        md: '/react/installation/manual.md',
        label: 'Manual installation',
      },
    ],
  },
  {
    title: 'Foundations',
    entries: [
      {
        mdx: 'foundations/surfaces.mdx',
        md: '/react/foundations/surfaces.md',
        label: 'Surfaces',
      },
      {
        mdx: 'foundations/colors.mdx',
        md: '/react/foundations/colors.md',
        label: 'Colors',
      },
      {
        mdx: 'foundations/sizing.mdx',
        md: '/react/foundations/sizing.md',
        label: 'Sizing',
      },
    ],
  },
  {
    title: 'Components',
    entries: componentNames.map((name) => {
      const slug = toKebab(name);
      return {
        mdx: `components/${slug}.mdx`,
        md: `/react/components/${slug}.md`,
        label: name,
      };
    }),
  },
  {
    title: 'Hooks',
    entries: hookNames.map((name) => {
      const slug = toKebab(name);
      return {
        mdx: `hooks/${slug}.mdx`,
        md: `/react/hooks/${slug}.md`,
        label: name,
      };
    }),
  },
];

function parseDescription(mdxPath) {
  const text = readFileSync(mdxPath, 'utf8');
  const layoutMatch = text.match(/<DocsLayout([\s\S]*?)>/);
  if (!layoutMatch) {
    throw new Error(`No <DocsLayout> tag in ${mdxPath}`);
  }
  const descMatch = layoutMatch[1].match(
    /\bdescription\s*=\s*"((?:[^"\\]|\\.)*)"/,
  );
  if (!descMatch) {
    throw new Error(`No description attribute in ${mdxPath}`);
  }
  return descMatch[1].trim();
}

const header = `# cladd

> cladd is an opinionated React UI kit for building real apps, editors, and dashboards — not a landing-page kit, not a headless primitives library. It ships with a defined visual identity (recessed/cut surfaces, subtle gradients, dark-first theming, a blue accent baked in by default), eleven accent colors with five variants each, a consistent \`2xs\` → \`2xl\` sizing scale across every interactive control, and application-grade components (Toolbar, Segmented, Shortcut, OTPField, NumberField, Select) for the boring app-shell parts. Distributed via npm as \`@cladd-ui/react\`. Requires React 19 and Tailwind CSS v4. Already shipping in Swiper Studio, t0ggles, PaneFlow, and Start Page HQ.

Each link below points at the plain-Markdown twin of the corresponding docs page — same content, no JSX, ready to ingest.
`;

let out = header + '\n';
for (const section of sections) {
  out += `## ${section.title}\n\n`;
  for (const entry of section.entries) {
    const mdxPath = resolve(pagesRoot, entry.mdx);
    const desc = parseDescription(mdxPath);
    out += `- [${entry.label}](${SITE_ORIGIN}${entry.md}): ${desc}\n`;
  }
  out += '\n';
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, out);
console.log(
  `[generate-llms-txt] wrote ${outFile.replace(projectRoot + '/', '')}`,
);
