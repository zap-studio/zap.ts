import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

type VercelProviderProps = {
	config: {
		enableVercelAnalytics: boolean;
		enableVercelSpeedInsights: boolean;
	};
};

export function VercelProvider({ config }: VercelProviderProps) {
	const { enableVercelAnalytics, enableVercelSpeedInsights } = config;

	return (
		<>
			{enableVercelAnalytics && <Analytics />}
			{enableVercelSpeedInsights && <SpeedInsights />}
		</>
	);
}
