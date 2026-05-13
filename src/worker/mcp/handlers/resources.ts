// MCP resources surface — parallel to the get_* tools, but addressable by
// URI so clients that drive a generic resource browser (Claude Desktop,
// some IDE integrations) can list and read docs without knowing about the
// custom cladd tools. All three handlers feed off the same MCP_CATALOG and
// the same loadDoc() helper the tools use, so there's a single source of
// truth for both the listing and the content.
//
// URI scheme:
//   cladd://components/<slug>     (e.g. cladd://components/button)
//   cladd://foundations/<slug>    (e.g. cladd://foundations/quickstart)
//   cladd://hooks/<slug>          (e.g. cladd://hooks/use-dialog)

import { MCP_CATALOG, type CatalogKind } from '../../../generated/mcp-catalog';
import { loadDoc } from '../tools/get-doc';
import type {
  ListResourcesResult,
  ListResourceTemplatesResult,
  ReadResourceResult,
  Resource,
  ResourceContent,
  ResourceTemplate,
} from '../types';

export type ResourcesReadOutcome =
  | { kind: 'ok'; result: ReadResourceResult }
  | { kind: 'error'; code: number; message: string };

const SECTIONS: Record<
  CatalogKind,
  { authority: 'components' | 'foundations' | 'hooks'; label: string }
> = {
  component: { authority: 'components', label: 'component' },
  foundation: { authority: 'foundations', label: 'foundation' },
  hook: { authority: 'hooks', label: 'hook' },
};

const AUTHORITY_TO_KIND: Record<
  'components' | 'foundations' | 'hooks',
  CatalogKind
> = {
  components: 'component',
  foundations: 'foundation',
  hooks: 'hook',
};

function resourceUri(kind: CatalogKind, slug: string): string {
  return `cladd://${SECTIONS[kind].authority}/${slug}`;
}

export function handleResourcesList(): ListResourcesResult {
  const resources: Resource[] = MCP_CATALOG.map((entry) => ({
    uri: resourceUri(entry.kind, entry.slug),
    name: entry.name,
    description: entry.description,
    mimeType: 'text/markdown',
  }));
  return { resources };
}

export function handleResourcesTemplatesList(): ListResourceTemplatesResult {
  const resourceTemplates: ResourceTemplate[] = [
    {
      uriTemplate: 'cladd://components/{slug}',
      name: 'Component reference',
      description:
        'Full Markdown reference for a cladd component (prose, examples, props table, screenshots).',
      mimeType: 'text/markdown',
    },
    {
      uriTemplate: 'cladd://foundations/{slug}',
      name: 'Foundation page',
      description:
        'A cladd foundation page (quickstart, surfaces, colors, sizing, pitfalls) — the cross-cutting conventions that touch every component.',
      mimeType: 'text/markdown',
    },
    {
      uriTemplate: 'cladd://hooks/{slug}',
      name: 'Hook reference',
      description:
        'Full Markdown reference for one of the cladd hooks (useDialog, useToast, useTheme, useSurface, useDevice, useAccentColor).',
      mimeType: 'text/markdown',
    },
  ];
  return { resourceTemplates };
}

export async function handleResourcesRead(
  params: { uri: string },
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string,
): Promise<ResourcesReadOutcome> {
  const parsed = parseResourceUri(params.uri);
  if (!parsed) {
    return {
      kind: 'error',
      code: -32602,
      message: `Invalid resource URI: "${params.uri}". Expected cladd://components/<slug>, cladd://foundations/<slug>, or cladd://hooks/<slug>.`,
    };
  }

  const doc = await loadDoc({
    kind: parsed.kind,
    section: SECTIONS[parsed.kind].authority,
    slug: parsed.slug,
    assets,
    baseUrl,
  });
  if (!doc.ok) {
    // -32002 is the conventional MCP "resource not found" code in the
    // spec. The text of the error carries the catalog hint that loadDoc
    // already assembled.
    return { kind: 'error', code: -32002, message: doc.error };
  }

  const contents: ResourceContent[] = [
    { uri: params.uri, mimeType: 'text/markdown', text: doc.markdown },
  ];
  if (doc.image) {
    contents.push({
      uri: params.uri,
      mimeType: doc.image.mimeType,
      blob: doc.image.data,
    });
  }
  return { kind: 'ok', result: { contents } };
}

function parseResourceUri(
  uri: string,
): { kind: CatalogKind; slug: string } | null {
  let parsed: URL;
  try {
    parsed = new URL(uri);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'cladd:') return null;
  const authority = parsed.host as 'components' | 'foundations' | 'hooks';
  const kind = AUTHORITY_TO_KIND[authority];
  if (!kind) return null;
  const slug = parsed.pathname.replace(/^\//, '');
  if (!slug) return null;
  return { kind, slug };
}
