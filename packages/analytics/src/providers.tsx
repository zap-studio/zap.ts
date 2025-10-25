import { ANALYTICS_CONFIG } from ".";
import { PostHogProvider } from "./posthog/providers";
import { VercelProvider } from "./vercel/providers";

type AnalyticsProviderProps = {
	children: React.ReactNode;
};

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
	return (
		<PostHogProvider
			config={{
				enablePostHog: ANALYTICS_CONFIG.POSTHOG.ENABLED,
				apiKey: ANALYTICS_CONFIG.POSTHOG.API_KEY,
				host: ANALYTICS_CONFIG.POSTHOG.HOST,
			}}
		>
			{children}
			<VercelProvider
				config={{
					enableVercelAnalytics: ANALYTICS_CONFIG.VERCEL.ANALYTICS.ENABLED,
					enableVercelSpeedInsights:
						ANALYTICS_CONFIG.VERCEL.SPEED_INSIGHTS.ENABLED,
				}}
			/>
		</PostHogProvider>
	);
}
