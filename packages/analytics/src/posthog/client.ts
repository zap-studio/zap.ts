import "client-only";

import { PostHog } from "posthog-node";

export function PostHogClient(config: { apiKey: string; host: string }) {
	const posthogClient = new PostHog(config.apiKey || "", {
		host: config.host,
		flushAt: 1,
		flushInterval: 0,
	});
	return posthogClient;
}
