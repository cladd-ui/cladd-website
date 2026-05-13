// Shared fetcher for the three get_* tools. Pulls the prebuilt Markdown
// twin from the ASSETS binding — the same file a browser would receive
// when hitting /react/<section>/<slug>.md — and, when available, attaches
// the doc's first ("overview") screenshot as an image content block so
// the visual identity travels with every response.

import { MCP_CATALOG, type CatalogKind } from '../../../generated/mcp-catalog';
import type { ToolCallResult, ToolContent } from '../types';

interface FetchOpts {
  kind: CatalogKind;
  section: 'components' | 'foundations' | 'hooks';
  slug: string;
  assets: { fetch: (request: Request | string) => Promise<Response> };
  baseUrl: string;
}

const FIRST_SCREENSHOT_RE = /!\[[^\]]*\]\(([^)]+\/screenshots\/[^)]+\.png)\)/i;

export async function fetchDoc(opts: FetchOpts): Promise<ToolCallResult> {
  const { kind, section, slug, assets, baseUrl } = opts;
  const entry = MCP_CATALOG.find((e) => e.kind === kind && e.slug === slug);
  if (!entry) {
    const known = MCP_CATALOG.filter((e) => e.kind === kind)
      .map((e) => e.slug)
      .join(', ');
    return error(`Unknown ${kind} slug: "${slug}". Known slugs: ${known}.`);
  }

  const url = new URL(`/react/${section}/${slug}.md`, baseUrl).toString();
  let res: Response;
  try {
    res = await assets.fetch(url);
  } catch (err) {
    return error(
      `Failed to fetch ${section}/${slug}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
  if (!res.ok) {
    return error(`Doc not found: ${section}/${slug} (status ${res.status})`);
  }
  const text = await res.text();

  const content: ToolContent[] = [{ type: 'text', text }];

  // Attach the doc's first screenshot inline. Hooks pages have no images,
  // so this is a best-effort enrichment — failures (missing image, fetch
  // error) degrade to a text-only response rather than failing the call.
  const screenshotPath = extractFirstScreenshotPath(text);
  if (screenshotPath) {
    const image = await fetchScreenshotAsImage(
      screenshotPath,
      assets,
      baseUrl,
    );
    if (image) content.push(image);
  }

  return { content };
}

function extractFirstScreenshotPath(markdown: string): string | null {
  const match = markdown.match(FIRST_SCREENSHOT_RE);
  if (!match) return null;
  try {
    // Markdown URLs may be absolute (https://cladd.io/screenshots/…) or
    // root-relative (/screenshots/…). new URL with a fallback base gives
    // us a consistent pathname either way.
    return new URL(match[1], 'https://cladd.io/').pathname;
  } catch {
    return null;
  }
}

async function fetchScreenshotAsImage(
  pathname: string,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string,
): Promise<ToolContent | null> {
  try {
    const url = new URL(pathname, baseUrl).toString();
    const res = await assets.fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const mimeType = (res.headers.get('content-type') ?? 'image/png')
      .split(';')[0]
      .trim();
    return {
      type: 'image',
      data: arrayBufferToBase64(buf),
      mimeType,
    };
  } catch {
    return null;
  }
}

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  // Chunk to avoid `Maximum call stack size exceeded` on String.fromCharCode
  // with very large argument lists.
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(
      null,
      chunk as unknown as number[],
    );
  }
  return btoa(binary);
}

function error(message: string): ToolCallResult {
  return {
    content: [{ type: 'text', text: JSON.stringify({ error: message }) }],
    isError: true,
  };
}
