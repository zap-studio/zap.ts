import "server-only";

import { __DEV__ } from "@zap/env";
import type { z } from "zod";
import { ZodError } from "zod";
import { BaseError, InternalServerError } from "../..";
import { HANDLER_TYPES } from "../../constants";
import { HttpStatus } from "../../http";
import type { ErrorResponse, HandlerOptions, HandlerType } from "../../types";
import { generateUuid } from "../../uuid";
import { logServerError } from "..";

export function generateCorrelationId(): string {
  return generateUuid();
}

/**
 * Creates a standardized error response object with appropriate HTTP status code.
 */
export function createErrorResponse(
  error: unknown,
  correlationId: string,
  includeStack = false
): { response: ErrorResponse; statusCode: number } {
  const timestamp = new Date().toISOString();

  if (error instanceof BaseError) {
    return {
      response: {
        error: error.name,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        timestamp,
        correlationId,
        ...(includeStack &&
          __DEV__ && {
            details: { stack: error.stack, cause: error.cause },
          }),
      },
      statusCode: error.statusCode,
    };
  }

  if (error instanceof ZodError) {
    return {
      response: {
        error: "ValidationError",
        message: "Invalid input data",
        code: "VALIDATION_ERROR",
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp,
        correlationId,
        details: error.issues,
      },
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  if (error instanceof Error) {
    return {
      response: {
        error: "InternalServerError",
        message: __DEV__ ? error.message : "An unexpected error occurred",
        code: "INTERNAL_SERVER_ERROR",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp,
        correlationId,
        ...(__DEV__ &&
          includeStack && {
            details: { stack: error.stack },
          }),
      },
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    response: {
      error: "UnknownError",
      message: "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp,
      correlationId,
      ...(__DEV__ && {
        details: { error: String(error) },
      }),
    },
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };
}

/**
 * Logs successful handler execution with duration and context.
 */
export function logSuccess(
  correlationId: string,
  startTime: number,
  options: HandlerOptions & { handlerType: HandlerType }
) {
  const duration = Date.now() - startTime;

  const meta = {
    context: options.context,
    duration,
    type: options.handlerType,
  };
  process.stdout.write(
    `[${correlationId}] ${options.handlerType} completed in ${duration}ms ${JSON.stringify(meta)}\n`
  );
}

/**
 * Transforms unknown errors into BaseError instances for consistent error handling.
 */
export function transformError(error: unknown): BaseError {
  if (error instanceof BaseError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new InternalServerError("Validation failed", error);
  }

  return new InternalServerError("Operation failed", error);
}

/**
 * Logs error metadata including duration and context.
 */
export function logErrorMetadata(
  error: unknown,
  correlationId: string,
  startTime: number,
  options: HandlerOptions & { handlerType: HandlerType }
): void {
  const duration = Date.now() - startTime;

  logServerError(error);
  const meta = {
    context: options.context,
    duration,
    type: options.handlerType,
    errorType: error instanceof Error ? error.constructor.name : typeof error,
  };
  process.stderr.write(
    `[${correlationId}] ${options.handlerType} failed after ${duration}ms ${JSON.stringify(meta)}\n`
  );
}

/**
 * Type for custom error handler that can be injected to handle specific handler types.
 * Returns true if the error was handled, false to continue with default handling.
 */
export type CustomErrorHandler<R> = (
  error: unknown,
  correlationId: string,
  options: HandlerOptions & { handlerType: HandlerType }
) => { handled: true; result?: R } | { handled: false };

/**
 * Handles errors across different handler types with proper logging and transformation.
 * Supports custom error handlers for extensibility (e.g., ORPC).
 */
export function handleError<R>(
  error: unknown,
  correlationId: string,
  startTime: number,
  options: HandlerOptions & {
    handlerType: HandlerType;
    customHandler?: CustomErrorHandler<R>;
  }
): R {
  logErrorMetadata(error, correlationId, startTime, options);

  // Allow custom handler to intercept (e.g., for RPC)
  if (options.customHandler) {
    const result = options.customHandler(error, correlationId, options);
    if (result.handled) {
      // Custom handler threw or will throw
      return result.result as R;
    }
  }

  // For server actions, transform to BaseError
  if (options.handlerType === HANDLER_TYPES.SERVER_ACTION) {
    throw transformError(error);
  }

  // For API routes, return HTTP response
  if (options.handlerType === "api-route") {
    const { response, statusCode } = createErrorResponse(
      error,
      correlationId,
      options.includeStack
    );

    return Response.json(response, {
      status: statusCode,
      headers: {
        "x-correlation-id": correlationId,
        "x-error-type": response.error,
      },
    }) as R;
  }

  // Fallback: throw as is
  throw error;
}

/**
 * Parses and validates the JSON body of a Request using the provided Zod schema.
 */
export async function parseRequestBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}
