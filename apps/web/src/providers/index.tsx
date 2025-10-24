"use client";
import "client-only";

import { AnalyticsProvider } from "@zap/analytics/providers";
import { TanStackQueryProvider } from "@zap/async-state/tanstack-query/providers";
import { TanStackFormProvider } from "@zap/forms/tanstack-form/providers";
import { BaseProviders } from "@zap/ui/providers/base";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { orpcQueryClient } from "@/lib/tanstack-query";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<BaseProviders>
			<NuqsAdapter>
				<TanStackQueryProvider queryClient={orpcQueryClient}>
					<TanStackFormProvider>
						<AnalyticsProvider>{children}</AnalyticsProvider>
					</TanStackFormProvider>
				</TanStackQueryProvider>
			</NuqsAdapter>
		</BaseProviders>
	);
}
