import type { HANDLER_TYPES } from "./constants";
import type { HttpStatus } from "./http";

export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];

export type HandlerFunction<T extends unknown[], R> = (
	...args: T
) => Promise<R> | R;

export type ErrorResponse = {
	error: string;
	message: string;
	code: string;
	statusCode: number;
	timestamp: string;
	correlationId: string;
	details?: unknown;
};

export type HandlerOptions = {
	includeStack?: boolean;
	correlationId?: string;
	context?: Record<string, unknown>;
};

export type HandlerType = (typeof HANDLER_TYPES)[keyof typeof HANDLER_TYPES];
