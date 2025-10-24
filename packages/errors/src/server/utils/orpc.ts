import "server-only";

import { COMMON_ORPC_ERROR_DEFS, type ORPCErrorCode } from "@orpc/client";
import { ORPCError } from "@orpc/server";
import type { BaseError } from "../..";
import { HANDLER_TYPES } from "../../constants";
import type { HandlerOptions, HandlerType } from "../../types";
import { handleError, transformError } from ".";

/**
 * Converts a BaseError to an ORPC-formatted error.
 * Maps custom error codes to valid ORPC error codes, defaulting to INTERNAL_SERVER_ERROR.
 */
export function toORPCError<TCode extends ORPCErrorCode>(
	baseError: BaseError,
): ORPCError<TCode, { message: string; cause: unknown }> {
	const validCodes = Object.keys(COMMON_ORPC_ERROR_DEFS) as ORPCErrorCode[];
	const code: ORPCErrorCode = validCodes.includes(
		baseError.code as ORPCErrorCode,
	)
		? (baseError.code as ORPCErrorCode)
		: "INTERNAL_SERVER_ERROR";

	return new ORPCError(code as TCode, {
		data: {
			message: baseError.message,
			cause: baseError.cause,
		},
	});
}

/**
 * Custom error handler for oRPC operations.
 * Transforms errors into ORPCError format if the handler type is "rpc".
 * Otherwise, indicates that the error was not handled.
 */
export function customOrpcErrorHandler<R>(
	error: unknown,
	_correlationId: string,
	options: HandlerOptions & { handlerType: HandlerType },
): { handled: boolean; result?: R } {
	if (options.handlerType === HANDLER_TYPES.RPC) {
		const baseError = transformError(error);
		throw toORPCError(baseError);
	}
	return { handled: false };
}

/**
 * Handles errors specific to oRPC operations by delegating to the generic error handler
 * with a custom oRPC error handler.
 */
export function handleOrpcError<R>(
	error: unknown,
	correlationId: string,
	startTime: number,
	options: HandlerOptions & { handlerType: HandlerType },
): R {
	return handleError<R>(error, correlationId, startTime, {
		...options,
		customHandler: customOrpcErrorHandler,
	});
}
