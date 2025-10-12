import { __DEV__ } from "../../constants";
import type { HandlerFunction, HandlerOptions, HandlerType } from "../../types";
import { generateCorrelationId, logSuccess } from "../utils";
import { handleOrpcError } from "../utils/orpc";

export function createHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions & { handlerType: HandlerType }
) {
  return async (...args: T): Promise<R> => {
    const correlationId = options.correlationId || generateCorrelationId();
    const startTime = Date.now();

    try {
      const result = await handler(...args);

      if (__DEV__) {
        logSuccess(correlationId, startTime, options);
      }

      return result;
    } catch (error) {
      return handleOrpcError(error, correlationId, startTime, options);
    }
  };
}

/**
 * Creates an RPC handler by wrapping a handler function with error handling and options.
 *
 * This function is a convenience wrapper around `createHandler` that automatically
 * sets the `handlerType` to "rpc-procedures" for RPC-specific error handling.
 *
 * @template T - A tuple type representing the argument types of the handler function
 * @template R - The return type of the handler function
 *
 * @param handler - The handler function to wrap with RPC error handling
 * @param options - Optional configuration options for the handler (defaults to an empty object)
 *
 * @returns A wrapped handler function with RPC-specific error handling applied
 *
 * @example
 * ```typescript
 * import { myAsyncRpcProcedure } from "./myRpcProcedures";
 * const myRpcHandler = withRpcHandler(
 *   myAsyncRpcProcedure,
 *   { correlationId: 'optional-correlation-id' }
 * );
 * ```
 */
export function withRpcHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions = {}
) {
  return createHandler(handler, {
    ...options,
    handlerType: "rpc-procedures",
  });
}
