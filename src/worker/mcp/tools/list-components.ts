import { MCP_CATALOG, type CatalogKind } from '../../../generated/mcp-catalog';
import type { ToolCallResult } from '../types';

interface ListComponentsParams {
  kind?: CatalogKind;
}

export function listComponents(params: ListComponentsParams): ToolCallResult {
  const { kind } = params ?? {};
  const entries = kind
    ? MCP_CATALOG.filter((e) => e.kind === kind)
    : MCP_CATALOG;
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          entries.map((e) => ({
            kind: e.kind,
            slug: e.slug,
            name: e.name,
            description: e.description,
          })),
          null,
          2,
        ),
      },
    ],
  };
}
