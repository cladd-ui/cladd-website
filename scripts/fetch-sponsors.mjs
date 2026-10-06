#!/usr/bin/env node
// Pull cladd's active sponsors from the sponsors portal
// (sponsors.nolimits4web.com) into src/generated/sponsors.json. Runs as part
// of `codegen`, so every dev/build snapshots the current sponsor list into
// the static export — no runtime fetch.
//
// If the portal is unreachable we keep the previous snapshot when there is
// one, and fall back to an empty list otherwise. A sponsor outage must never
// break a deploy.

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = resolve(projectRoot, 'src/generated/sponsors.json');

const API_URL = 'https://sponsors.nolimits4web.com/api/sponsors/cladd';
const TIMEOUT_MS = 10_000;

function write(sponsors) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(sponsors, null, 2) + '\n');
}

try {
  const res = await fetch(API_URL, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('unexpected response shape');

  const sponsors = data
    .map((item) => ({
      title: item.title ?? '',
      link: item.link ?? '',
      image: item.image ?? '',
      plan: item.plan === 'Gold Sponsor' ? 'Gold Sponsor' : 'Sponsor',
      createdAt: item.createdAt ?? '',
    }))
    .filter((s) => s.title || s.image);

  write(sponsors);
  console.log(
    `[fetch-sponsors] wrote ${sponsors.length} sponsors → ${relative(projectRoot, outPath)}`,
  );
} catch (err) {
  if (existsSync(outPath)) {
    console.warn(
      `[fetch-sponsors] fetch failed (${err.message}) — keeping existing ${relative(projectRoot, outPath)}`,
    );
  } else {
    console.warn(
      `[fetch-sponsors] fetch failed (${err.message}) — writing empty list`,
    );
    write([]);
  }
}
