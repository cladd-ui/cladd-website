import type { JsonRpcRequest, JsonRpcResponse, JsonRpcError } from '../types';
import { JSON_RPC_ERROR_CODES } from '../types';

export function parseRequest(body: string): JsonRpcRequest {
  let request: JsonRpcRequest;
  try {
    request = JSON.parse(body) as JsonRpcRequest;
  } catch {
    throw new Error('Parse error: Invalid JSON');
  }
  if (!validateRequest(request)) {
    throw new Error('Invalid request structure');
  }
  return request;
}

export function validateRequest(request: unknown): request is JsonRpcRequest {
  if (typeof request !== 'object' || request === null) return false;
  const req = request as Record<string, unknown>;
  const hasValidId =
    req.id === undefined ||
    req.id === null ||
    typeof req.id === 'string' ||
    typeof req.id === 'number';
  return req.jsonrpc === '2.0' && typeof req.method === 'string' && hasValidId;
}

export function createResponse(
  id: string | number | null,
  result: unknown,
): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result };
}

export function createError(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown,
): JsonRpcResponse {
  const error: JsonRpcError = { code, message };
  if (data !== undefined) error.data = data;
  return { jsonrpc: '2.0', id, error };
}

export function createParseError(): JsonRpcResponse {
  return createError(null, JSON_RPC_ERROR_CODES.PARSE_ERROR, 'Parse error');
}

export function createInvalidRequestError(
  id: string | number | null,
): JsonRpcResponse {
  return createError(
    id,
    JSON_RPC_ERROR_CODES.INVALID_REQUEST,
    'Invalid Request',
  );
}

export function createMethodNotFoundError(
  id: string | number | null,
  method: string,
): JsonRpcResponse {
  return createError(
    id,
    JSON_RPC_ERROR_CODES.METHOD_NOT_FOUND,
    `Method not found: ${method}`,
  );
}

export function createInvalidParamsError(
  id: string | number | null,
  message?: string,
): JsonRpcResponse {
  return createError(
    id,
    JSON_RPC_ERROR_CODES.INVALID_PARAMS,
    message || 'Invalid params',
  );
}
