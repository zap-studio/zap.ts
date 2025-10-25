import type { HandlerFunction, HandlerOptions } from "../../types";
import { createHandler } from ".";

export function withRpcHandler<T extends unknown[], R>(
	handler: HandlerFunction<T, R>,
	options: HandlerOptions = {},
) {
	return createHandler(handler, {
		...options,
		handlerType: "rpc-procedure",
		context: { type: "rpc", ...options.context },
	});
}
