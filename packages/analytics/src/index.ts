import { __VERCEL__ } from "@zap/env";
import { ANALYTICS_ENV } from "./env";
import type { AnalyticsConfig } from "./types";

export const ANALYTICS_CONFIG: AnalyticsConfig = {
	POSTHOG: {
		ENABLED: false,
		API_KEY: ANALYTICS_ENV.NEXT_PUBLIC_POSTHOG_API_KEY || "",
		HOST: ANALYTICS_ENV.NEXT_PUBLIC_POSTHOG_HOST,
	},
	VERCEL: {
		ANALYTICS: {
			ENABLED: __VERCEL__,
		},
		SPEED_INSIGHTS: {
			ENABLED: __VERCEL__,
		},
	},
};
