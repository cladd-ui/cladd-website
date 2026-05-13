#!/usr/bin/env node
// Generate plain-Markdown twins of every MDX page under src/pages/react.
// Each output lands at public/<route>.md so the static export (`next build`,
// `output: 'export'`) copies them to /out, where the Worker's ASSETS binding
// serves them at e.g. /react/components/button.md — same shape shadcn-ui uses
// for "view as Markdown" and for feeding pages to agents.
//
// Per file we:
//   1. Drop the import block and the `export default ({ children }) => …`
//      DocsLayout wrapper.
//   2. Replace each self-closing <XxxExample /> with a ```tsx fence sourced
//      from src/generated/example-source/<name>.ts (the same string Example.tsx
//      shows in the live page).
//   3. Replace each self-closing <XxxProps /> with a Markdown props table
//      built from src/generated/props/<XxxProps>.tsx (the `data` array).
//
// Everything else — prose, headings, fenced code blocks, links — passes
// through untouched.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagesRoot = resolve(projectRoot, 'src/pages/react');
const exampleSourceDir = resolve(projectRoot, 'src/generated/example-source');
const propsDir = resolve(projectRoot, 'src/generated/props');
const outRoot = resolve(projectRoot, 'public/react');

// Public site origin used to build absolute URLs in the YAML frontmatter.
const SITE_ORIGIN = 'https://cladd.io';

const exampleSourceCache = new Map();
const propsTableCache = new Map();

// Wipe the previous output so deleted/renamed MDX pages don't leave stale .md
// twins lying around in public/.
if (existsSync(outRoot)) {
  for (const entry of readdirSync(outRoot)) {
    const full = join(outRoot, entry);
    if (statSync(full).isDirectory()) {
      rmSync(full, { recursive: true, force: true });
    } else if (entry.endsWith('.md')) {
      rmSync(full);
    }
  }
}

const mdxFiles = collectMdxFiles(pagesRoot);
let written = 0;
let skipped = 0;
for (const mdxPath of mdxFiles) {
  const raw = readFileSync(mdxPath, 'utf8');
  if (shouldSkip(raw)) {
    skipped++;
    continue;
  }
  const md = convertMdx(mdxPath, raw);
  const rel = relative(pagesRoot, mdxPath).replace(/\.mdx$/, '.md');
  const outPath = join(outRoot, rel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, md);
  written++;
}

console.log(
  `[generate-markdown-docs] wrote ${written} markdown twins → ${relative(projectRoot, outRoot)}/${skipped ? ` (skipped ${skipped})` : ''}`,
);

// ---------------------------------------------------------------------------

function collectMdxFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectMdxFiles(full));
    } else if (entry.endsWith('.mdx')) {
      out.push(full);
    }
  }
  return out.sort();
}

// Pages that pass `markdownActions={false}` to <DocsLayout> opt out of having
// a Markdown twin generated. They mostly render React components with no
// meaningful Markdown representation (e.g. the components index/tile grid).
function shouldSkip(raw) {
  const layoutMatch = raw.match(/<DocsLayout([\s\S]*?)>/);
  if (!layoutMatch) return false;
  return /\bmarkdownActions\s*=\s*\{\s*false\s*\}/.test(layoutMatch[1]);
}

function convertMdx(mdxPath, raw) {
  const { body, imports, meta } = stripHeader(raw, mdxPath);
  const replacements = buildReplacements(imports);
  const md = rewriteJsx(body, replacements, imports.knownButMissing)
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();
  const frontmatter = renderFrontmatter(meta, mdxPath, md);
  return frontmatter + md + '\n';
}

// Slice off everything up to the first Markdown heading (`# …`). That leaves
// us with the imports + DocsLayout default-export above the cut, which we
// scan separately to know which JSX names are examples vs props and to lift
// the DocsLayout `title` / `description` into YAML frontmatter.
function stripHeader(raw, mdxPath) {
  const headingIdx = raw.search(/^# /m);
  const header = headingIdx === -1 ? raw : raw.slice(0, headingIdx);
  const body = headingIdx === -1 ? '' : raw.slice(headingIdx);
  return {
    body,
    imports: parseImports(header, mdxPath),
    meta: parseDocsLayoutMeta(header),
  };
}

// Pull `title` and `description` out of the DocsLayout opening tag. Each MDX
// page declares them as string-literal JSX attributes:
//
//   <DocsLayout
//     title="Button — Cladd"
//     description="Clickable control for ..."
//   >
//
// We grab them with simple per-attribute regexes (the values are always plain
// double-quoted strings — no JSX expressions, no template literals).
function parseDocsLayoutMeta(header) {
  const meta = { title: null, description: null };
  const layoutMatch = header.match(/<DocsLayout([\s\S]*?)>/);
  if (!layoutMatch) return meta;
  const attrs = layoutMatch[1];
  const titleMatch = attrs.match(/\btitle\s*=\s*"((?:[^"\\]|\\.)*)"/);
  const descMatch = attrs.match(/\bdescription\s*=\s*"((?:[^"\\]|\\.)*)"/);
  if (titleMatch) {
    // Strip the " — Cladd" suffix every page carries for <title>.
    meta.title = titleMatch[1].replace(/\s+[—-]\s+Cladd$/, '').trim();
  }
  if (descMatch) meta.description = descMatch[1].trim();
  return meta;
}

function renderFrontmatter(meta, mdxPath, body) {
  const docUrl = SITE_ORIGIN + pagePath(mdxPath);
  // Only emit `api:` when the page actually has an API Reference section to
  // anchor on (component pages do; the intro/installation pages don't).
  const apiUrl = /^##\s+API Reference\b/m.test(body)
    ? docUrl + '#api-reference'
    : null;
  const lines = ['---'];
  if (meta.title) lines.push(`title: ${yamlString(meta.title)}`);
  if (meta.description) {
    lines.push(`description: ${yamlString(meta.description)}`);
  }
  lines.push('links:');
  lines.push(`  doc: ${docUrl}`);
  if (apiUrl) lines.push(`  api: ${apiUrl}`);
  lines.push('---', '');
  return lines.join('\n') + '\n';
}

// next-export with trailingSlash: true serves each page at /<route>/. Mirror
// that path here so absolute URLs in the frontmatter match the canonical
// HTML route (e.g. `/react/components/button/`).
function pagePath(mdxPath) {
  const rel = relative(pagesRoot, mdxPath).replace(/\.mdx$/, '');
  const route =
    rel === 'index'
      ? ''
      : rel.endsWith('/index')
        ? rel.slice(0, -'/index'.length)
        : rel;
  return '/react/' + (route ? route + '/' : '');
}

// YAML scalar that needs quoting only if it contains characters that confuse
// the bare-string form (colon, leading dash, etc). We always quote to keep
// the rule simple, and escape the few characters that matter inside double
// quotes.
function yamlString(value) {
  return '"' + value.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

// Match each `import … from '…';` statement and bucket the names by what
// kind of replacement they trigger when referenced later in the body.
function parseImports(header, mdxPath) {
  const examples = new Map(); // JSX tag name -> source string
  const props = new Map(); // JSX tag name -> markdown table
  // Names that were imported as examples but whose source the upstream
  // extractor couldn't recover. We still know they exist, so we drop the
  // <Name /> placeholder rather than leak raw JSX into the markdown.
  const knownButMissing = new Set();

  const importRegex =
    /import\s+(?:(\w+)|\{([^}]+)\})\s+from\s+['"]([^'"]+)['"]\s*;?/g;
  let m;
  while ((m = importRegex.exec(header))) {
    const [, defaultName, namedList, spec] = m;

    // <XxxProps /> tables are default-imported from @/generated/props/Xxx.
    const propsMatch = spec.match(/^@\/generated\/props\/(\w+)$/);
    if (propsMatch && defaultName) {
      const table = loadPropsTable(propsMatch[1]);
      if (table) props.set(defaultName, table);
      else knownButMissing.add(defaultName);
      continue;
    }

    // <XxxExample /> sources come from @/components/examples/<kebab>; the
    // matching extracted-source module lives at src/generated/example-source/<kebab>.ts.
    const examplesMatch = spec.match(/^@\/components\/examples\/([\w-]+)$/);
    if (examplesMatch && namedList) {
      const sourceMap = loadExampleSource(examplesMatch[1]);
      for (const rawName of namedList.split(',')) {
        const name = rawName
          .trim()
          .split(/\s+as\s+/)[0]
          .trim();
        if (!name) continue;
        if (sourceMap.has(name)) {
          examples.set(name, sourceMap.get(name));
        } else {
          knownButMissing.add(name);
          console.warn(
            `[generate-markdown-docs] ${relative(projectRoot, mdxPath)}: example "${name}" imported from @/components/examples/${examplesMatch[1]} but missing from generated source — dropping placeholder`,
          );
        }
      }
    }
  }
  return { examples, props, knownButMissing };
}

function buildReplacements({ examples, props }) {
  const map = new Map();
  for (const [name, code] of examples) {
    map.set(name, '```tsx\n' + code + '\n```');
  }
  for (const [name, table] of props) {
    map.set(name, table);
  }
  return map;
}

// Walk the body line by line. Any line that is exactly a self-closing JSX
// tag for one of our known examples/props components gets replaced; all
// other content (including fenced code blocks containing `<Foo />` inside)
// flows through untouched.
function rewriteJsx(body, replacements, knownButMissing) {
  const lines = body.split('\n');
  const out = [];
  let inFence = false;
  let fenceMarker = '';
  for (const line of lines) {
    const fenceMatch = line.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fenceMatch[1];
      } else if (line.startsWith(fenceMarker)) {
        inFence = false;
        fenceMarker = '';
      }
      out.push(line);
      continue;
    }
    if (!inFence) {
      const tag = line.match(/^\s*<(\w+)\s*\/>\s*$/);
      if (tag) {
        if (replacements.has(tag[1])) {
          out.push(replacements.get(tag[1]));
          continue;
        }
        if (knownButMissing.has(tag[1])) {
          // Drop the orphan placeholder rather than leak raw JSX.
          continue;
        }
      }
    }
    out.push(line);
  }
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Loading the codegen artifacts

function loadExampleSource(name) {
  if (exampleSourceCache.has(name)) return exampleSourceCache.get(name);
  const file = join(exampleSourceDir, `${name}.ts`);
  const map = new Map();
  if (!existsSync(file)) {
    exampleSourceCache.set(name, map);
    return map;
  }
  // The generated module is a plain `export const EXAMPLE_SOURCE: Record<…> = {
  // Name: "literal", … };`. We strip the TS type annotation and `eval` the
  // object literal — no functions, no JSX, just JSON-compatible strings.
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(
    /export\s+const\s+EXAMPLE_SOURCE\s*:\s*[^=]+=\s*(\{[\s\S]*?\n\});/,
  );
  if (!match) {
    exampleSourceCache.set(name, map);
    return map;
  }
  const obj = Function(`"use strict"; return (${match[1]});`)();
  for (const [k, v] of Object.entries(obj)) map.set(k, v);
  exampleSourceCache.set(name, map);
  return map;
}

function loadPropsTable(propsName) {
  if (propsTableCache.has(propsName)) return propsTableCache.get(propsName);
  const file = join(propsDir, `${propsName}.tsx`);
  if (!existsSync(file)) {
    propsTableCache.set(propsName, null);
    return null;
  }
  const raw = readFileSync(file, 'utf8');
  const data = readJsonAssignment(raw, 'data');
  const typeParams = readJsonAssignment(raw, 'typeParams') ?? [];
  const extendsList = readJsonAssignment(raw, 'extendsList') ?? [];
  const table = renderPropsTable(data, typeParams, extendsList);
  propsTableCache.set(propsName, table);
  return table;
}

// Slice `export const <name>(: …)? = <JSON>;` out of a generated props
// module. The RHS is always pure JSON (the generator uses JSON.stringify)
// so we can locate the closing bracket by walking with string-awareness
// and then parse with JSON.parse.
function readJsonAssignment(source, name) {
  const re = new RegExp(`export\\s+const\\s+${name}\\s*(?::\\s*[^=]+)?=\\s*`);
  const m = re.exec(source);
  if (!m) return null;
  const start = m.index + m[0].length;
  const open = source[start];
  if (open !== '[' && open !== '{') return null;
  const close = open === '[' ? ']' : '}';
  let depth = 0;
  let i = start;
  let inStr = false;
  while (i < source.length) {
    const ch = source[i];
    if (inStr) {
      if (ch === '\\') {
        i += 2;
        continue;
      }
      if (ch === '"') inStr = false;
    } else if (ch === '"') {
      inStr = true;
    } else if (ch === open) {
      depth++;
    } else if (ch === close) {
      depth--;
      if (depth === 0) {
        const slice = source.slice(start, i + 1);
        return JSON.parse(slice);
      }
    }
    i++;
  }
  return null;
}

function renderPropsTable(rows, typeParams, extendsList) {
  const parts = [];
  if (typeParams.length > 0) {
    const generics = typeParams
      .map(
        (tp) =>
          `${tp.name}${tp.constraint ? ` extends ${tp.constraint}` : ''}${tp.default ? ` = ${tp.default}` : ''}`,
      )
      .join(', ');
    parts.push(`**Generics:** \`${generics}\``);
  }
  if (extendsList.length > 0) {
    const links = extendsList
      .map((p) => {
        const kebab = propsTypeToKebab(p);
        const display = p.replace(/Props$/, '');
        return `[\`${display}\`](/react/components/${kebab}/)`;
      })
      .join(', ');
    parts.push(`**Inherits from:** ${links}`);
  }
  if (rows.length === 0) {
    parts.push('_No own props — see inherited types above._');
    return parts.join('\n\n');
  }
  const header = '| Prop | Type | Default | Description |';
  const sep = '| --- | --- | --- | --- |';
  const lines = [header, sep];
  for (const row of rows) {
    const nameCell = `\`${row.name}${row.optional ? '?' : ''}\``;
    const typeCell = `\`${escapeCell(row.type)}\``;
    const defaultCell = row.default ? `\`${escapeCell(row.default)}\`` : '—';
    const descCell = escapeCell(row.description || '');
    lines.push(`| ${nameCell} | ${typeCell} | ${defaultCell} | ${descCell} |`);
  }
  parts.push(lines.join('\n'));
  return parts.join('\n\n');
}

// Markdown tables can't contain real newlines or unescaped pipes; fold
// multi-line descriptions onto a single visual line with <br>.
function escapeCell(text) {
  return text
    .replace(/\|/g, '\\|')
    .replace(/\r\n/g, '\n')
    .replace(/\n+/g, '<br>');
}

// Mirror PropsTable.tsx's mapping: strip the trailing `Props`, kebab-case
// the rest, so `SurfaceContentProps` → `surface-content`.
function propsTypeToKebab(name) {
  return name
    .replace(/Props$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
