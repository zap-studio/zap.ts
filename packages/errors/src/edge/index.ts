import "server-only";

import { MAX_STACK_LINES } from "../constants";

export function logMiddlewareError(error: unknown): void {
	const timestamp = new Date().toISOString();
	let message: string;

	if (error instanceof Error) {
		const stackLines = error.stack?.split("\n") ?? [];
		const relevantStack = stackLines.slice(0, MAX_STACK_LINES).join("\n");

		message = [
			`[${timestamp}] [${error.name}]`,
			`Message: ${error.message}`,
			error.cause ? `Cause: ${String(error.cause)}` : null,
			`Stack: ${relevantStack}`,
		]
			.filter(Boolean)
			.join("\n");
	} else if (typeof error === "string") {
		message = `[${timestamp}] [UnknownError] ${error}`;
	} else {
		message = `[${timestamp}] [UnknownError] ${JSON.stringify(error, null, 2)}`;
	}

	// biome-ignore lint/suspicious/noConsole: Edge runtime doesn't support process.stderr so we use console.error instead
	console.error(`${message}\n`);
}
