"use client";
import "client-only";

import { AnalyticsProvider } from "@zap/analytics/providers";
import { BaseProviders } from "@zap/ui/providers/base";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<BaseProviders>
			<AnalyticsProvider>{children}</AnalyticsProvider>
		</BaseProviders>
	);
}
