// Shared fetcher for the three get_* tools. Pulls the prebuilt Markdown
// twin from the ASSETS binding — the same file a browser would receive
// when hitting /react/<section>/<slug>.md.

import { MCP_CATALOG, type CatalogKind } from '../../../generated/mcp-catalog';
import type { ToolCallResult } from '../types';

interface FetchOpts {
  kind: CatalogKind;
  section: 'components' | 'foundations' | 'hooks';
  slug: string;
  assets: { fetch: (request: Request | string) => Promise<Response> };
  baseUrl: string;
}

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
  return {
    content: [{ type: 'text', text }],
  };
}

function error(message: string): ToolCallResult {
  return {
    content: [{ type: 'text', text: JSON.stringify({ error: message }) }],
    isError: true,
  };
}
