import { Hono } from 'hono';
import {
  parseRequest,
  createResponse,
  createError,
  createParseError,
  createInvalidRequestError,
  createMethodNotFoundError,
} from './utils/jsonrpc';
import { JSON_RPC_ERROR_CODES } from './types';
import { handleInitialize } from './handlers/initialize';
import { handleToolsList, handleToolsCall } from './handlers/tools';

export const mcpApp = new Hono<{ Bindings: Env }>();

// GET /mcp — share the path with the public docs page (static export at
// /mcp/index.html). Forward to the ASSETS binding so browsers visiting
// the URL get the docs, not a JSON blob. The MCP server itself responds
// to POST /mcp; clients never need GET on the root.
mcpApp.get('/', async (c) => c.env.ASSETS.fetch(c.req.raw));

// GET /mcp/health
mcpApp.get('/health', (c) =>
  c.json({ status: 'ok', service: 'cladd-mcp-server' }),
);

// POST /mcp — the JSON-RPC entry point. Handles both requests
// (have an id, expect a response) and notifications (no id, no body).
mcpApp.post('/', async (c) => {
  try {
    const body = await c.req.text();
    if (!body) {
      return c.json(createParseError(), 400);
    }

    let request;
    try {
      request = parseRequest(body);
    } catch (err) {
      console.error('MCP parse error:', err, 'body head:', body.slice(0, 200));
      return c.json(createParseError(), 400);
    }

    if (!request || !request.method) {
      return c.json(createInvalidRequestError(request?.id ?? null), 400);
    }

    const { method, id, params } = request;

    // Notifications — no id, no response expected.
    if (id === undefined) {
      // notifications/initialized fires after the client finishes handshake.
      // Unknown notifications are silently dropped.
      return c.body(null, 204);
    }

    let result;
    switch (method) {
      case 'initialize':
        result = handleInitialize(
          params as Parameters<typeof handleInitialize>[0],
        );
        break;

      case 'ping':
        result = { pong: true };
        break;

      case 'tools/list':
        result = { tools: handleToolsList() };
        break;

      case 'tools/call': {
        if (!params || typeof params !== 'object') {
          return c.json(
            createError(
              id,
              JSON_RPC_ERROR_CODES.INVALID_PARAMS,
              'tools/call requires params with name and arguments',
            ),
            400,
          );
        }
        const toolParams = params as { name: string; arguments?: unknown };
        if (!toolParams.name) {
          return c.json(
            createError(
              id,
              JSON_RPC_ERROR_CODES.INVALID_PARAMS,
              'tools/call requires a name',
            ),
            400,
          );
        }
        const url = new URL(c.req.url);
        const baseUrl = `${url.protocol}//${url.host}`;
        result = await handleToolsCall(
          { name: toolParams.name, arguments: toolParams.arguments },
          c.env.ASSETS,
          baseUrl,
        );
        break;
      }

      default:
        return c.json(createMethodNotFoundError(id, method), 404);
    }

    return c.json(createResponse(id, result));
  } catch (err) {
    console.error('MCP handler error:', err);
    return c.json(
      createError(
        null,
        JSON_RPC_ERROR_CODES.INTERNAL_ERROR,
        err instanceof Error ? err.message : 'Internal error',
        { error: String(err) },
      ),
      500,
    );
  }
});
