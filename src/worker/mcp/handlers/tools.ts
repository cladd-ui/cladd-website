import type { CatalogKind } from '../../../generated/mcp-catalog';
import { getComponent } from '../tools/get-component';
import { getFoundation } from '../tools/get-foundation';
import { getHook } from '../tools/get-hook';
import { listComponents } from '../tools/list-components';
import { search } from '../tools/search';
import type { Tool, ToolCallParams, ToolCallResult } from '../types';
import { getTools } from './initialize';

export function handleToolsList(): Tool[] {
  return getTools();
}

export async function handleToolsCall(
  params: ToolCallParams,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string,
): Promise<ToolCallResult> {
  const { name, arguments: args } = params;
  const a = (args ?? {}) as Record<string, unknown>;

  switch (name) {
    case 'list_components':
      return listComponents({ kind: a.kind as CatalogKind | undefined });

    case 'get_component':
      return await getComponent({ slug: a.slug as string }, assets, baseUrl);

    case 'get_foundation':
      return await getFoundation({ slug: a.slug as string }, assets, baseUrl);

    case 'get_hook':
      return await getHook({ slug: a.slug as string }, assets, baseUrl);

    case 'search':
      return search({
        query: a.query as string,
        kind: a.kind as CatalogKind | undefined,
      });

    default:
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: `Unknown tool: ${name}` }),
          },
        ],
        isError: true,
      };
  }
}
