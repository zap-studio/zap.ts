import "server-only";

import { __DEV__ } from "./constants";
import type { HandlerFunction, HandlerOptions, HandlerType } from "./types";
import { generateCorrelationId, handleError, logSuccess } from "./utils";

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

export function withApiHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions = {}
) {
  return createHandler(handler, {
    ...options,
    handlerType: "api-route",
  });
}

export function withRpcHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions = {}
) {
  return createHandler(handler, {
    ...options,
    handlerType: "rpc-procedures",
  });
}

export function withServerActionHandler<T extends unknown[], R>(
  handler: HandlerFunction<T, R>,
  options: HandlerOptions = {}
) {
  return createHandler(handler, {
    ...options,
    handlerType: "server-action",
  });
}
