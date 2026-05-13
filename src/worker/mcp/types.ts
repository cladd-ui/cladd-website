// JSON-RPC 2.0 + MCP protocol types. Mirrors the shape used by the
// Swiper MCP server so the JSON wire format is identical across our
// docs sites.

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number | null;
  method: string;
  params?: unknown;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: JsonRpcError;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

export const JSON_RPC_ERROR_CODES = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
} as const;

export interface InitializeParams {
  protocolVersion: string;
  capabilities?: {
    tools?: object;
    resources?: object;
    prompts?: object;
  };
  clientInfo?: {
    name: string;
    version: string;
  };
}

export interface InitializeResult {
  protocolVersion: string;
  capabilities: {
    tools?: {
      listChanged?: boolean;
    };
    resources?: {
      subscribe?: boolean;
      listChanged?: boolean;
    };
    prompts?: {
      listChanged?: boolean;
    };
  };
  serverInfo: {
    name: string;
    version: string;
  };
  // Persistent guidance surfaced to the client on connect. cladd uses this
  // for the "always consult screenshots when unsure" rule and the tool map.
  instructions?: string;
}

export interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export interface ToolCallParams {
  name: string;
  arguments?: unknown;
}

export type ToolContent =
  | { type: 'text'; text: string }
  | { type: 'image'; data: string; mimeType: string };

export interface ToolCallResult {
  content: ToolContent[];
  isError?: boolean;
}

// MCP resources — parallel surface to tools for static, URI-addressable
// content. Clients that drive a browsable resource UI (Claude Desktop,
// some IDE integrations) discover docs through these endpoints without
// needing to know about the get_component / get_foundation tools.

export interface Resource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface ResourceTemplate {
  uriTemplate: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface ListResourcesResult {
  resources: Resource[];
}

export interface ListResourceTemplatesResult {
  resourceTemplates: ResourceTemplate[];
}

export interface ReadResourceParams {
  uri: string;
}

// Unlike ToolCallResult.content (which mixes text/image in a single array),
// resources/read returns a list of typed `contents` items — each one either
// text OR a base64 blob, never both in the same item. We return two items
// per doc: the markdown body, then the overview screenshot.
export type ResourceContent =
  | { uri: string; mimeType?: string; text: string }
  | { uri: string; mimeType?: string; blob: string };

export interface ReadResourceResult {
  contents: ResourceContent[];
}
