import "server-only";

import type { z } from "zod";
import { ZodError } from "zod";
import { BaseError, InternalServerError } from "..";
import { __DEV__, HANDLER_TYPES } from "../constants";
import { HttpStatus } from "../http";
import { logServerError } from "../server";
import type { ErrorResponse, HandlerOptions, HandlerType } from "../types";
import { generateUuid } from "../uuid";

export function generateCorrelationId(): string {
  return generateUuid();
}

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

export function transformError(error: unknown): BaseError {
  if (error instanceof BaseError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new InternalServerError("Validation failed", error);
  }

  return new InternalServerError("Operation failed", error);
}

export function handleError<R>(
  error: unknown,
  correlationId: string,
  startTime: number,
  options: HandlerOptions & { handlerType: HandlerType }
): R {
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

  // For RPC procedures, convert BaseError to ORPC error
  if (options.handlerType === HANDLER_TYPES.RPC) {
    const baseError = transformError(error);
    throw baseError.toORPCError();
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

export async function parseRequestBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}
