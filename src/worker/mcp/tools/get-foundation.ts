import type { ToolCallResult } from '../types';
import { fetchDoc } from './get-doc';

export async function getFoundation(
  params: { slug: string },
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string,
): Promise<ToolCallResult> {
  const { slug } = params ?? {};
  if (!slug || typeof slug !== 'string') {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: 'slug parameter is required and must be a string',
          }),
        },
      ],
      isError: true,
    };
  }
  return fetchDoc({
    kind: 'foundation',
    section: 'foundations',
    slug,
    assets,
    baseUrl,
  });
}
