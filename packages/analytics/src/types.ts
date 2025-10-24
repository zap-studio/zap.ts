export type AnalyticsConfig = {
	POSTHOG: {
		ENABLED: boolean;
		API_KEY: string;
		HOST: string;
	};
	VERCEL: {
		ANALYTICS: {
			ENABLED: boolean;
		};
		SPEED_INSIGHTS: {
			ENABLED: boolean;
		};
	};
};
