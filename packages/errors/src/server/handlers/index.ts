import "server-only";

import { __DEV__ } from "@zap/env";
import type { HandlerFunction, HandlerOptions, HandlerType } from "../../types";
import { generateCorrelationId, handleError, logSuccess } from "../utils";

/**
 * Creates a wrapped handler function with built-in error handling, logging, and correlation tracking.
 */
export function createHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions & {
    handlerType: HandlerType;
    customErrorHandler?: (
      error: unknown,
      correlationId: string,
      startTime: number,
      options: HandlerOptions & { handlerType: HandlerType }
    ) => { handled: boolean; result?: unknown };
  }
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
      if (options.customErrorHandler) {
        const result = options.customErrorHandler(
          error,
          correlationId,
          startTime,
          options
        );
        if (result.handled) {
          // Custom handler threw or will throw
          return result.result as R;
        }
      }
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
 * @example
 * const myApiHandler = withApiHandler(
 *   async (req, res) => {
 *     // Your API logic here
 *     return { success: true };
 *   },
 *   { correlationId: 'optional-correlation-id' }
 * );
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
 * @example
 * const myServerAction = withServerActionHandler(
 *   async (userId: string) => {
 *     // server action logic
 *     return { success: true };
 *   },
 *   { correlationId: 'optional-correlation-id' }
 * );
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
