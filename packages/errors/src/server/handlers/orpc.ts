import type { HandlerFunction, HandlerOptions } from "../../types";
import { handleOrpcError } from "../utils/orpc";
import { createHandler } from ".";

/**
 * Creates an RPC handler by wrapping a handler function with error handling and options.
 *
 * This function is a convenience wrapper around `createHandler` that automatically
 * sets the `handlerType` to "rpc-procedures" for RPC-specific error handling.
 *
 * @example
 * import { myAsyncRpcProcedure } from "./myRpcProcedures";
 * const myRpcHandler = withRpcHandler(
 *   myAsyncRpcProcedure,
 *   { correlationId: 'optional-correlation-id' }
 * );
 */
export function withRpcHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions = {}
) {
  return createHandler(handler, {
    ...options,
    handlerType: "rpc-procedures",
    customErrorHandler: handleOrpcError,
  });
}
