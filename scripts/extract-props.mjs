#!/usr/bin/env node
// Extract per-component prop metadata from @cladd-ui/react .d.ts files and
// emit one generated React component per props type. Run as a pre-step before
// `next dev` / `next build` so docs pages can `import ButtonProps from
// '@/generated/props/ButtonProps'` and render a typed table.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const pkgRoot = resolve(projectRoot, 'node_modules/@cladd-ui/react');
const indexFile = join(pkgRoot, 'index.d.ts');
const outDir = resolve(projectRoot, 'src/generated/props');

const fileCache = new Map();
function parseFile(filePath) {
  let cached = fileCache.get(filePath);
  if (cached) return cached;
  const source = readFileSync(filePath, 'utf8');
  cached = ts.createSourceFile(filePath, source, ts.ScriptTarget.ESNext, true);
  fileCache.set(filePath, cached);
  return cached;
}

function resolveModulePath(fromFile, spec) {
  // './components/Foo.js' (or './bar') -> resolved .d.ts path
  let base = resolve(dirname(fromFile), spec);
  if (base.endsWith('.js')) base = base.slice(0, -3);
  if (existsSync(base + '.d.ts')) return base + '.d.ts';
  if (existsSync(join(base, 'index.d.ts'))) return join(base, 'index.d.ts');
  return null;
}

// 1. Walk index.d.ts; collect every type-only export whose name ends with "Props".
function discoverPropsExports() {
  const source = parseFile(indexFile);
  const exports = []; // { name, file }
  for (const stmt of source.statements) {
    if (!ts.isExportDeclaration(stmt)) continue;
    if (!stmt.exportClause || !ts.isNamedExports(stmt.exportClause)) continue;
    if (!stmt.moduleSpecifier || !ts.isStringLiteral(stmt.moduleSpecifier))
      continue;
    const modPath = resolveModulePath(indexFile, stmt.moduleSpecifier.text);
    if (!modPath) continue;
    const blanketIsType = !!stmt.isTypeOnly;
    for (const spec of stmt.exportClause.elements) {
      const isType = blanketIsType || !!spec.isTypeOnly;
      if (!isType) continue;
      // `export { Foo as Bar }` — exported name is `name`, original is `propertyName`
      const exportedName = spec.name.text;
      const localName = spec.propertyName?.text ?? spec.name.text;
      if (!exportedName.endsWith('Props')) continue;
      exports.push({ name: exportedName, localName, file: modPath });
    }
  }
  return exports;
}

// 2. Resolve a props type to the underlying members. The shape we hit varies:
//    - `interface FooProps { ... }`
//    - `type FooProps = FooOwnProps & Omit<X, keyof FooOwnProps>` (polymorphic)
//    - `type FooProps = ButtonProps<C> & { ... extra ... }` (extension)
//    - `type FooProps = ButtonProps<C>` (pure alias)
//
//    We walk the alias's RHS, expanding intersections and local type refs, and
//    record any external `*Props` references so the doc page can show them
//    as `extends`. Externals like `Omit`/`ComponentPropsWithoutRef` are ignored.
const TYPE_HELPERS_TO_SKIP = new Set([
  'Omit',
  'Pick',
  'Partial',
  'Required',
  'Readonly',
  'Exclude',
  'Extract',
  'NonNullable',
  'ComponentProps',
  'ComponentPropsWithoutRef',
  'ComponentPropsWithRef',
  'HTMLAttributes',
  'AllHTMLAttributes',
  'ButtonHTMLAttributes',
  'AnchorHTMLAttributes',
  'InputHTMLAttributes',
  'TextareaHTMLAttributes',
  'LabelHTMLAttributes',
  'SVGAttributes',
  'AriaAttributes',
  'DOMAttributes',
]);

function findDeclaration(name, sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (
      (ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)) &&
      stmt.name.text === name
    ) {
      return stmt;
    }
  }
  return null;
}

function collectFromTypeNode(typeNode, sourceFile, ctx) {
  if (ts.isTypeLiteralNode(typeNode)) {
    for (const m of typeNode.members) ctx.members.push(m);
    return;
  }
  if (ts.isIntersectionTypeNode(typeNode) || ts.isUnionTypeNode(typeNode)) {
    for (const t of typeNode.types) collectFromTypeNode(t, sourceFile, ctx);
    return;
  }
  if (ts.isParenthesizedTypeNode(typeNode)) {
    collectFromTypeNode(typeNode.type, sourceFile, ctx);
    return;
  }
  if (ts.isTypeReferenceNode(typeNode)) {
    const refName = ts.isIdentifier(typeNode.typeName)
      ? typeNode.typeName.text
      : null;
    if (!refName) return;
    if (TYPE_HELPERS_TO_SKIP.has(refName)) {
      // Peek into the first type argument so wrappers like
      // `Omit<TooltipPrimitiveProps, …>` still surface the underlying
      // `*Props` reference for the extends list.
      if (typeNode.typeArguments && typeNode.typeArguments.length > 0) {
        collectFromTypeNode(typeNode.typeArguments[0], sourceFile, ctx);
      }
      return;
    }
    const localDecl = findDeclaration(refName, sourceFile);
    if (localDecl) {
      if (ctx.visited.has(refName)) return;
      ctx.visited.add(refName);
      collectFromDeclaration(localDecl, sourceFile, ctx);
      return;
    }
    // External reference. If it looks like another component's props type,
    // record it for cross-linking in the rendered table.
    if (refName.endsWith('Props')) ctx.extendsExternal.add(refName);
  }
}

// ExpressionWithTypeArguments (the node behind `extends X<…>`) isn't a TypeNode,
// so it can't be passed to `collectFromTypeNode` directly. This helper reads
// the expression name + type arguments and applies the same rules as a
// TypeReferenceNode.
function collectFromHeritageType(node, sourceFile, ctx) {
  if (!ts.isIdentifier(node.expression)) return;
  const refName = node.expression.text;
  if (TYPE_HELPERS_TO_SKIP.has(refName)) {
    if (node.typeArguments && node.typeArguments.length > 0) {
      collectFromTypeNode(node.typeArguments[0], sourceFile, ctx);
    }
    return;
  }
  const localDecl = findDeclaration(refName, sourceFile);
  if (localDecl) {
    if (ctx.visited.has(refName)) return;
    ctx.visited.add(refName);
    collectFromDeclaration(localDecl, sourceFile, ctx);
    return;
  }
  if (refName.endsWith('Props')) ctx.extendsExternal.add(refName);
}

function collectFromDeclaration(decl, sourceFile, ctx) {
  if (!ctx.rootTypeParameters && decl.typeParameters) {
    ctx.rootTypeParameters = decl.typeParameters;
  }
  if (ts.isInterfaceDeclaration(decl)) {
    for (const m of decl.members) ctx.members.push(m);
    // Chase heritage clauses (`interface FooProps extends BarProps {…}`,
    // or `extends Omit<BarProps, …>`) so the extends list catches the
    // inherited types.
    if (decl.heritageClauses) {
      for (const hc of decl.heritageClauses) {
        for (const typeRef of hc.types) {
          collectFromHeritageType(typeRef, sourceFile, ctx);
        }
      }
    }
    return;
  }
  if (ts.isTypeAliasDeclaration(decl)) {
    collectFromTypeNode(decl.type, sourceFile, ctx);
  }
}

function resolvePropsType(typeName, sourceFile) {
  const decl = findDeclaration(typeName, sourceFile);
  if (!decl) return null;
  const ctx = {
    members: [],
    extendsExternal: new Set(),
    visited: new Set([typeName]),
    rootTypeParameters: null,
  };
  collectFromDeclaration(decl, sourceFile, ctx);
  return ctx;
}

// 3. Resolve type parameter constraints so polymorphic `as?: C` renders as
//    `ElementType` (with a trailing default note) rather than the bare `C`.
function buildTypeParamMap(typeParameters, printer, sourceFile) {
  const map = new Map();
  if (!typeParameters) return map;
  for (const tp of typeParameters) {
    const name = tp.name.text;
    const constraint = tp.constraint
      ? printer.printNode(ts.EmitHint.Unspecified, tp.constraint, sourceFile)
      : null;
    const def = tp.default
      ? printer.printNode(ts.EmitHint.Unspecified, tp.default, sourceFile)
      : null;
    map.set(name, { constraint, default: def });
  }
  return map;
}

function rewriteTypeParams(typeStr, paramMap) {
  if (paramMap.size === 0) return typeStr;
  let out = typeStr;
  for (const [name, info] of paramMap) {
    if (!info.constraint) continue;
    // Replace whole-word occurrences of the type parameter with its constraint.
    out = out.replace(new RegExp(`\\b${name}\\b`, 'g'), info.constraint);
  }
  return out;
}

// 4. Pull the JSDoc immediately preceding a property signature, splitting body
//    text from tags. Also tries to recover a `@default` value, falling back to
//    common phrasings inside the description ("Default `…`", "Defaults to `…`").
function extractDoc(node, sourceFile) {
  const fullText = sourceFile.getFullText();
  const ranges =
    ts.getLeadingCommentRanges(fullText, node.getFullStart()) || [];
  let description = '';
  let defaultValue = null;
  for (const range of ranges) {
    if (range.kind !== ts.SyntaxKind.MultiLineCommentTrivia) continue;
    const raw = fullText.slice(range.pos, range.end);
    if (!raw.startsWith('/**')) continue;
    const cleaned = raw
      .replace(/^\/\*\*+/, '')
      .replace(/\*+\/$/, '')
      .split('\n')
      .map((line) => line.replace(/^\s*\*\s?/, ''))
      .join('\n')
      .replace(/^\n+|\n+$/g, '');

    const bodyLines = [];
    const tags = [];
    let curTag = null;
    let curLines = [];
    for (const line of cleaned.split('\n')) {
      const m = line.match(/^@(\w+)\s*(.*)$/);
      if (m) {
        if (curTag)
          tags.push({ tag: curTag, content: curLines.join('\n').trim() });
        curTag = m[1];
        curLines = [m[2]];
      } else if (curTag) {
        curLines.push(line);
      } else {
        bodyLines.push(line);
      }
    }
    if (curTag) tags.push({ tag: curTag, content: curLines.join('\n').trim() });

    description = bodyLines.join('\n').trim();
    for (const t of tags) {
      if (t.tag === 'default' || t.tag === 'defaultValue') {
        defaultValue = t.content;
      }
    }
  }

  if (!defaultValue && description) {
    const patterns = [
      /Defaults?\s+(?:to\s+)?`([^`]+)`/i,
      /Default[:\s]+`([^`]+)`/i,
      /Default\s+`([^`]+)`/i,
    ];
    for (const re of patterns) {
      const m = description.match(re);
      if (m) {
        defaultValue = m[1];
        break;
      }
    }
  }

  return { description, default: defaultValue };
}

function extractPropsFromMembers(members, typeParameters, sourceFile) {
  const printer = ts.createPrinter({
    removeComments: true,
    omitTrailingSemicolon: true,
    newLine: ts.NewLineKind.LineFeed,
  });
  const paramMap = buildTypeParamMap(typeParameters, printer, sourceFile);
  const seen = new Set();
  const rows = [];
  for (const member of members) {
    if (!ts.isPropertySignature(member) || !member.name) continue;
    let name;
    if (ts.isIdentifier(member.name)) name = member.name.text;
    else if (ts.isStringLiteral(member.name)) name = member.name.text;
    else continue;
    if (name === 'ref') continue;
    if (seen.has(name)) continue; // later override wins; keep first definition
    seen.add(name);
    const optional = !!member.questionToken;
    let type = member.type
      ? printer.printNode(ts.EmitHint.Unspecified, member.type, sourceFile)
      : 'unknown';
    type = rewriteTypeParams(type, paramMap).replace(/\s+/g, ' ').trim();
    const { description, default: defaultValue } = extractDoc(
      member,
      sourceFile,
    );
    rows.push({
      name,
      type,
      optional,
      default: defaultValue,
      description,
    });
  }
  return rows;
}

function extractTypeParamsInfo(typeParameters, sourceFile) {
  if (!typeParameters || typeParameters.length === 0) return [];
  const printer = ts.createPrinter({
    removeComments: true,
    omitTrailingSemicolon: true,
    newLine: ts.NewLineKind.LineFeed,
  });
  return typeParameters.map((tp) => ({
    name: tp.name.text,
    constraint: tp.constraint
      ? printer.printNode(ts.EmitHint.Unspecified, tp.constraint, sourceFile)
      : null,
    default: tp.default
      ? printer.printNode(ts.EmitHint.Unspecified, tp.default, sourceFile)
      : null,
  }));
}

function generateComponent(name, rows, typeParams, extendsList) {
  const componentName = name.replace(/Props$/, '');
  const data = JSON.stringify(rows, null, 2);
  const tpJson = JSON.stringify(typeParams);
  const extJson = JSON.stringify(extendsList);
  return `// AUTO-GENERATED by scripts/extract-props.mjs. Do not edit.
import { PropsTable, type PropRow, type TypeParam } from '@/components/PropsTable';

export const data: PropRow[] = ${data};

export const typeParams: TypeParam[] = ${tpJson};

export const extendsList: string[] = ${extJson};

export default function ${name}() {
  return (
    <PropsTable
      component=${JSON.stringify(componentName)}
      typeParams={typeParams}
      rows={data}
      extendsList={extendsList}
    />
  );
}
`;
}

function main() {
  if (existsSync(outDir)) {
    rmSync(outDir, { recursive: true, force: true });
  }
  mkdirSync(outDir, { recursive: true });

  const exports = discoverPropsExports();
  const generated = [];
  const skipped = [];

  for (const exp of exports) {
    const sourceFile = parseFile(exp.file);
    const resolved = resolvePropsType(exp.localName, sourceFile);
    if (!resolved) {
      skipped.push({ name: exp.name, reason: 'no declaration found' });
      continue;
    }
    const rows = extractPropsFromMembers(
      resolved.members,
      resolved.rootTypeParameters,
      sourceFile,
    );
    rows.sort((a, b) => a.name.localeCompare(b.name));
    const extendsList = [...resolved.extendsExternal].sort();
    if (rows.length === 0 && extendsList.length === 0) {
      skipped.push({ name: exp.name, reason: 'no own properties resolved' });
      continue;
    }
    const typeParams = extractTypeParamsInfo(
      resolved.rootTypeParameters,
      sourceFile,
    );
    const code = generateComponent(exp.name, rows, typeParams, extendsList);
    writeFileSync(join(outDir, `${exp.name}.tsx`), code);
    generated.push(exp.name);
  }

  // Index barrel for convenience.
  const barrel = generated
    .sort()
    .map((n) => `export { default as ${n} } from './${n}';`)
    .join('\n');
  writeFileSync(join(outDir, 'index.ts'), barrel + '\n');

  const rel = relative(projectRoot, outDir);
  console.log(
    `[extract-props] wrote ${generated.length} prop tables → ${rel}/`,
  );
  if (skipped.length > 0) {
    for (const s of skipped) {
      console.log(`[extract-props]   skipped ${s.name}: ${s.reason}`);
    }
  }
}

main();
