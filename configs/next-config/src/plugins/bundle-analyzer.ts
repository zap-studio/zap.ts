import createBundleAnalyzer from "@next/bundle-analyzer";

/**
 * Bundle analyzer plugin for Next.js configuration.
 * This plugin enables bundle analysis when the ANALYZE environment variable is set to "true".
 * It helps visualize the size of webpack output files with an interactive zoomable treemap.
 */
export const withBundleAnalyzer = createBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});
