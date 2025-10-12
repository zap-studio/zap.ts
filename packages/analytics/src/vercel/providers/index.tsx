import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

type VercelProviderProps = {
  config: {
    isVercel: boolean;
    enableVercelAnalytics: boolean;
    enableVercelSpeedInsights: boolean;
  };
};

export function VercelProvider({ config }: VercelProviderProps) {
  const { isVercel, enableVercelAnalytics, enableVercelSpeedInsights } = config;

  if (!isVercel) {
    return null;
  }

  return (
    <>
      {enableVercelAnalytics && <Analytics />}
      {enableVercelSpeedInsights && <SpeedInsights />}
    </>
  );
}
