import "server-only";

import { __DEV__ } from "../../constants";
import type { HandlerFunction, HandlerOptions, HandlerType } from "../../types";
import { generateCorrelationId, handleError, logSuccess } from "../utils";

/**
 * Creates a wrapped handler function with built-in error handling, logging, and correlation tracking.
 *
 * @template T - A tuple type representing the parameters of the handler function
 * @template R - The return type of the handler function
 *
 * @param handler - The handler function to be wrapped
 * @param options - Configuration options for the handler, including correlation ID and handler type
 * @param options.correlationId - Optional correlation ID for tracking the execution. If not provided, one will be generated
 * @param options.handlerType - The type of handler being created (e.g., 'api', 'event', etc.)
 *
 * @returns An async function that wraps the original handler with error handling and logging capabilities
 *
 * @remarks
 * - Automatically generates a correlation ID if one is not provided
 * - Tracks execution time from start to finish
 * - Logs successful executions in development mode
 * - Catches and handles errors through the centralized error handling system
 *
 * @example
 * ```typescript
 * const myHandler = createHandler(
 *   async (userId: string) => {
 *     return await fetchUser(userId);
 *   },
 *   { handlerType: 'api' }
 * );
 * ```
 */
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
      return handleError(error, correlationId, startTime, options);
    }
  };
}

/**
 * Creates an API route handler with built-in error handling and logging capabilities.
 *
 * This function wraps a handler function with standardized error handling logic specifically
 * designed for API routes. It applies the provided options along with a preset handler type.
 *
 * @template T - The tuple type representing the parameters of the handler function
 * @template R - The return type of the handler function
 *
 * @param handler - The handler function to be wrapped with error handling
 * @param options - Optional configuration options for the handler. Defaults to an empty object
 *
 * @returns A wrapped handler function with error handling and logging applied
 *
 * @example
 * ```typescript
 * const myApiHandler = withApiHandler(
 *   async (req, res) => {
 *     // Your API logic here
 *     return { success: true };
 *   },
 *   { correlationId: 'optional-correlation-id' }
 * );
 * ```
 */
export function withApiHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions = {}
) {
  return createHandler(handler, {
    ...options,
    handlerType: "api-route",
  });
}

/**
 * Creates a wrapped server action handler with error handling and logging capabilities.
 *
 * This function wraps a server action handler function to provide consistent error handling,
 * logging, and other common middleware functionality for Next.js server actions.
 *
 * @template T - An array of parameter types that the handler accepts
 * @template R - The return type of the handler function
 *
 * @param handler - The server action handler function to be wrapped
 * @param options - Optional configuration options for the handler. Defaults to an empty object
 *
 * @returns A wrapped handler function with the same signature as the input handler,
 *          enhanced with error handling and configured for server action context
 *
 * @example
 * ```typescript
 * const myServerAction = withServerActionHandler(
 *   async (userId: string) => {
 *     // server action logic
 *     return { success: true };
 *   },
 *   { correlationId: 'optional-correlation-id' }
 * );
 * ```
 */
export function withServerActionHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions = {}
) {
  return createHandler(handler, {
    ...options,
    handlerType: "server-action",
  });
}
