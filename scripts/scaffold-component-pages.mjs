#!/usr/bin/env node
// One-shot scaffold for /docs/components/<slug>/ pages — minimal title + props
// table for every generated *Props file. Skips any page that already exists so
// custom-written pages (with examples, prose, etc.) survive a re-run.

import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const generatedDir = resolve(projectRoot, 'src/generated/props');
const pagesDir = resolve(projectRoot, 'src/pages/react/components');

function toKebab(s) {
  return s
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const files = readdirSync(generatedDir).filter((f) => f.endsWith('Props.tsx'));
const created = [];
const skipped = [];

for (const file of files) {
  const propsName = file.replace(/\.tsx$/, '');
  const componentName = propsName.replace(/Props$/, '');
  const slug = toKebab(componentName);
  const target = join(pagesDir, `${slug}.mdx`);
  if (existsSync(target)) {
    skipped.push(slug);
    continue;
  }
  const content = `import { DocsLayout } from '@/components/DocsLayout';
import ${propsName} from '@/generated/props/${propsName}';

export default ({ children }) => (
  <DocsLayout
    title="${componentName} — Cladd"
    description="${componentName} component props."
  >
    {children}
  </DocsLayout>
);

# ${componentName}

## Props

<${propsName} />
`;
  writeFileSync(target, content);
  created.push(slug);
}

console.log(
  `[scaffold-pages] created ${created.length}, skipped ${skipped.length}`,
);
if (created.length > 0) {
  console.log('  created:', created.sort().join(', '));
}
if (skipped.length > 0) {
  console.log('  skipped:', skipped.sort().join(', '));
}
