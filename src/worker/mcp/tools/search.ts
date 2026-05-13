import {
  MCP_CATALOG,
  type CatalogEntry,
  type CatalogKind,
} from '../../../generated/mcp-catalog';
import type { ToolCallResult } from '../types';

interface SearchParams {
  query: string;
  kind?: CatalogKind;
}

export function search(params: SearchParams): ToolCallResult {
  const { query, kind } = params ?? {};
  if (!query || typeof query !== 'string') {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: 'query parameter is required and must be a string',
          }),
        },
      ],
      isError: true,
    };
  }

  const needles = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);
  if (needles.length === 0) {
    return { content: [{ type: 'text', text: JSON.stringify([]) }] };
  }

  const scored: { entry: CatalogEntry; score: number }[] = [];
  for (const entry of MCP_CATALOG) {
    if (kind && entry.kind !== kind) continue;
    const haystack =
      `${entry.name} ${entry.slug} ${entry.description}`.toLowerCase();
    let score = 0;
    for (const needle of needles) {
      if (!haystack.includes(needle)) {
        score = 0;
        break;
      }
      // Name hits weigh more than description hits so an exact-name query
      // ranks the obvious match first.
      if (entry.name.toLowerCase().includes(needle)) score += 3;
      if (entry.slug.includes(needle)) score += 2;
      if (entry.description.toLowerCase().includes(needle)) score += 1;
    }
    if (score > 0) scored.push({ entry, score });
  }

  scored.sort((a, b) => b.score - a.score);
  const results = scored.map(({ entry }) => ({
    kind: entry.kind,
    slug: entry.slug,
    name: entry.name,
    description: entry.description,
  }));

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(results, null, 2),
      },
    ],
  };
}
