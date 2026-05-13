#!/usr/bin/env node
// Screenshot every <Example> on every component + foundations docs page and
// write the result to public/screenshots/<section>/<slug>/<example>.png.
//
// Drives a real browser (Playwright/Chromium) against the running dev server.
// Start the dev server in another terminal first:
//
//   npm run dev
//
// Then run all pages:
//
//   npm run screenshot:examples
//
// Or filter to specific slugs (matches against the .mdx file name):
//
//   npm run screenshot:examples -- popover dialog
//
// Floating-UI components are captured in "click mode": a 768×768 viewport, the
// first button in each preview gets clicked, and the visible viewport is what
// gets saved — so the popover/dialog/toast that pops up is what shows up in
// the image, not just the trigger button.
//
// Override the origin with SCREENSHOT_BASE_URL (default http://localhost:3000).

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'src', 'pages', 'react');
const OUT_DIR = path.join(ROOT, 'public', 'screenshots');
const BASE_URL = (
  process.env.SCREENSHOT_BASE_URL || 'http://localhost:3000'
).replace(/\/$/, '');

const SECTIONS = [
  { dir: 'components', out: 'components' },
  { dir: 'foundations', out: 'foundations' },
];

// Slugs whose examples only show a trigger (a button) in the preview area —
// the actual floating UI renders elsewhere when the trigger fires. For these
// we click the trigger and screenshot the whole viewport instead of just the
// preview rect.
const CLICK_MODE_SLUGS = new Set([
  'popover',
  'popup',
  'dialog',
  'toast',
  'select',
]);

const DEFAULT_VIEWPORT = { width: 1280, height: 1024 };
const CLICK_MODE_VIEWPORT = { width: 768, height: 768 };

// SizeExample → size, WithSpinnerExample → with-spinner,
// OTPInputExample → otp-input.
function exampleNameToSlug(name) {
  return name
    .replace(/Example$/, '')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

async function listMdxFiles(sectionDir) {
  const dir = path.join(PAGES_DIR, sectionDir);
  const entries = await fs.readdir(dir);
  return entries
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
    .map((f) => ({
      file: path.join(dir, f),
      slug: f.replace(/\.mdx$/, ''),
    }));
}

// Pull the ordered list of <XxxExample /> JSX usages out of an MDX body. The
// pattern matches self-closing tags only — every example in this repo is
// rendered that way — and excludes anything inside the leading import block
// by looking for `/>` at the end of the tag.
function parseExamples(mdxSource) {
  const re = /<([A-Z][A-Za-z0-9_]*Example)\b[^>]*\/>/g;
  const out = [];
  let m;
  while ((m = re.exec(mdxSource)) !== null) {
    out.push(m[1]);
  }
  return out;
}

// Walk an examples/<slug>.tsx source and return the set of example exports
// whose bodies contain `defaultOpen`. Used in click-mode to avoid clicking a
// trigger whose popover/popup is already shown by default — that click would
// toggle the floating UI closed.
function parseDefaultOpenExports(source) {
  const re = /^export\s+function\s+([A-Z][A-Za-z0-9_]*Example)\s*\(/gm;
  const positions = [];
  let m;
  while ((m = re.exec(source)) !== null) {
    positions.push({ name: m[1], start: m.index });
  }
  const out = new Set();
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end =
      i + 1 < positions.length ? positions[i + 1].start : source.length;
    const body = source.slice(start, end);
    if (/\bdefaultOpen\b/.test(body)) out.add(positions[i].name);
  }
  return out;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function checkServer() {
  try {
    const res = await fetch(BASE_URL, { method: 'GET' });
    if (!res.ok) throw new Error(`status ${res.status}`);
  } catch (err) {
    console.error(
      `\nUnable to reach ${BASE_URL} (${err.message}).\n` +
        `Start the dev server in another terminal:\n\n  npm run dev\n\n` +
        `Or point this script at a different origin via SCREENSHOT_BASE_URL.\n`,
    );
    process.exit(1);
  }
}

async function gotoAndReady(page, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForSelector('[data-cladd-example]', {
    state: 'attached',
    timeout: 10_000,
  });
  await page.waitForTimeout(150);
}

async function main() {
  const filterSlugs = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  const filterSet = filterSlugs.length > 0 ? new Set(filterSlugs) : null;

  await checkServer();
  await ensureDir(OUT_DIR);

  const pages = [];
  for (const section of SECTIONS) {
    const files = await listMdxFiles(section.dir);
    for (const { file, slug } of files) {
      if (filterSet && !filterSet.has(slug)) continue;
      const src = await fs.readFile(file, 'utf8');
      const examples = parseExamples(src);
      if (examples.length === 0) continue;
      const clickMode = CLICK_MODE_SLUGS.has(slug);
      let defaultOpenExports = new Set();
      if (clickMode) {
        const examplesFile = path.join(
          ROOT,
          'src',
          'components',
          'examples',
          `${slug}.tsx`,
        );
        try {
          const exSrc = await fs.readFile(examplesFile, 'utf8');
          defaultOpenExports = parseDefaultOpenExports(exSrc);
        } catch {}
      }
      pages.push({
        section: section.out,
        slug,
        url: `${BASE_URL}/react/${section.dir}/${slug}/`,
        examples,
        clickMode,
        defaultOpenExports,
      });
    }
  }

  if (filterSet && pages.length === 0) {
    console.error(`No matching pages for: ${[...filterSet].join(', ')}`);
    process.exit(1);
  }

  const totalExamples = pages.reduce((n, p) => n + p.examples.length, 0);
  const filterMsg = filterSet
    ? ` (filtered to ${[...filterSet].join(', ')})`
    : '';
  console.log(
    `Found ${pages.length} page(s), ${totalExamples} example(s)${filterMsg}. Launching browser…`,
  );

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: DEFAULT_VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: 'dark',
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  let totalShots = 0;
  const warnings = [];

  for (const p of pages) {
    process.stdout.write(
      `→ ${p.section}/${p.slug}${p.clickMode ? ' [click]' : ''} `,
    );
    await page.setViewportSize(
      p.clickMode ? CLICK_MODE_VIEWPORT : DEFAULT_VIEWPORT,
    );
    try {
      await gotoAndReady(page, p.url);
    } catch (err) {
      warnings.push(`${p.slug}: navigation failed — ${err.message}`);
      console.log('SKIP');
      continue;
    }

    const initialPreviews = await page
      .locator('[data-cladd-example-preview]')
      .all();
    if (initialPreviews.length !== p.examples.length) {
      warnings.push(
        `${p.slug}: ${initialPreviews.length} preview(s) in DOM but ${p.examples.length} <XxxExample /> in MDX — last screenshots may be misnamed`,
      );
    }

    const outDir = path.join(OUT_DIR, p.section, p.slug);
    await ensureDir(outDir);

    const count = Math.min(initialPreviews.length, p.examples.length);
    for (let i = 0; i < count; i++) {
      const name = exampleNameToSlug(p.examples[i]);
      const file = path.join(outDir, `${name}.png`);

      if (p.clickMode) {
        // Reload between examples so prior open dialog/popover/toast state
        // never leaks into the next shot.
        if (i > 0) {
          try {
            await gotoAndReady(page, p.url);
          } catch (err) {
            warnings.push(`${p.slug}/${name}: reload failed — ${err.message}`);
            continue;
          }
        }
        const previews = await page
          .locator('[data-cladd-example-preview]')
          .all();
        const preview = previews[i];
        if (!preview) {
          warnings.push(`${p.slug}/${name}: no preview at index ${i}`);
          continue;
        }
        // Center the preview vertically so floating panels have room to render.
        await preview.evaluate((el) =>
          el.scrollIntoView({ block: 'center', inline: 'center' }),
        );
        await page.waitForTimeout(100);
        const trigger = preview.locator('button').first();
        const triggerCount = await preview.locator('button').count();
        if (triggerCount === 0) {
          warnings.push(`${p.slug}/${name}: no <button> trigger in preview`);
          continue;
        }
        const disabled = await trigger.isDisabled();
        // Examples whose source uses `defaultOpen` render the floating UI
        // already expanded — clicking would toggle it back closed.
        const alreadyOpen = p.defaultOpenExports.has(p.examples[i]);
        if (!disabled && !alreadyOpen) {
          try {
            await trigger.click({ timeout: 3_000 });
            // Settle: animations + portal mount.
            await page.waitForTimeout(450);
          } catch (err) {
            warnings.push(
              `${p.slug}/${name}: trigger click failed — ${err.message.split('\n')[0]}`,
            );
          }
        }
        await page.screenshot({ path: file });
      } else {
        await initialPreviews[i].scrollIntoViewIfNeeded();
        await initialPreviews[i].screenshot({ path: file });
      }

      totalShots++;
      process.stdout.write('.');
    }
    process.stdout.write('\n');
  }

  await browser.close();

  const rel = path.relative(ROOT, OUT_DIR);
  console.log(`\n${totalShots} screenshot(s) written to ${rel}/.`);
  if (warnings.length > 0) {
    console.log(`\n${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`  - ${w}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
