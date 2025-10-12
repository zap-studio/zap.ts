import "server-only";

import { COMMON_ORPC_ERROR_DEFS, type ORPCErrorCode } from "@orpc/client";
import { ORPCError } from "@orpc/server";
import type { BaseError } from "../..";
import { HANDLER_TYPES } from "../../constants";
import type { HandlerOptions, HandlerType } from "../../types";
import { logServerError } from "..";
import { createErrorResponse, transformError } from ".";

export function toORPCError<TCode extends ORPCErrorCode>(
  this: BaseError
): ORPCError<TCode, { message: string; cause: unknown }> {
  const validCodes = Object.keys(COMMON_ORPC_ERROR_DEFS) as ORPCErrorCode[];
  const code: ORPCErrorCode = validCodes.includes(this.code as ORPCErrorCode)
    ? (this.code as ORPCErrorCode)
    : "INTERNAL_SERVER_ERROR";

  return new ORPCError(code as TCode, {
    data: {
      message: this.message,
      cause: this.cause,
    },
  });
}

/**
 * Handles errors across different handler types (RPC, server actions, API routes) with proper logging and transformation.
 *
 * @template R - The return type, typically a Response object for API routes
 * @param error - The error to handle, can be any type
 * @param correlationId - Unique identifier for tracking the request across logs
 * @param startTime - Timestamp (in milliseconds) when the operation started, used to calculate duration
 * @param options - Configuration options including handler type, context, and stack trace inclusion
 * @param options.handlerType - Type of handler: RPC, SERVER_ACTION, or api-route
 * @param options.context - Additional context information for error logging
 * @param options.includeStack - Whether to include stack traces in error responses
 *
 * @returns For API routes, returns a Response object with error details and appropriate headers.
 *          For other handler types, this function throws and does not return.
 *
 * @throws {ORPCError} When handlerType is RPC, throws an ORPC-formatted error
 * @throws {BaseError} When handlerType is SERVER_ACTION, throws a transformed BaseError
 * @throws {unknown} For unsupported handler types, re-throws the original error
 *
 * @remarks
 * This function:
 * - Calculates operation duration
 * - Logs errors to stderr with correlation ID and metadata
 * - Transforms errors based on handler type
 * - For API routes, returns a JSON response with appropriate status code and headers
 */
export function handleOrpcError<R>(
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
    throw toORPCError.call(baseError);
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
