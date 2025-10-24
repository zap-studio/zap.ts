import { BASE_URL } from "@zap/config";
import { buildCSPHeader, buildPermissionsPolicy } from "@zap/security/utils";
import type { NextConfig } from "next";
import type { NextAppType, NextConfigOptions } from "./types";
import { deepMerge } from "./utils";

/**
 * Creates a base Next.js configuration object with common settings.
 * This includes security headers, image settings, and package transpilation.
 * Additional plugins can be composed with this base configuration.
 *
 * When `appType` is set to "pwa", it adds specific headers for service workers.
 *
 * @example
 * // Basic usage
 * const config = createBaseConfig("pwa");
 *
 * @example
 * // With overrides
 * const config = createBaseConfig("default", {
 *   overrides: {
 *     transpilePackages: ["@repo/ui"],
 *     typedRoutes: false,
 *     images: {
 *       domains: ["example.com"]
 *     }
 *   }
 * });
 */
export function createBaseConfig(
	appType: NextAppType = "default",
	options?: NextConfigOptions,
): NextConfig {
	const baseConfig: NextConfig = {
		images: {
			remotePatterns: [{ protocol: "https", hostname: "avatar.vercel.sh" }],
		},
		pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
		typedRoutes: true,
		transpilePackages: [
			"@t3-oss/env-nextjs",
			"@t3-oss/env-core",
			...(options?.overrides?.transpilePackages || []),
		],
		async headers() {
			const headers = [
				{
					source: "/(.*)",
					headers: [
						{
							key: "Access-Control-Allow-Origin",
							value: `'self' ${BASE_URL}`.trim(),
						},
						{ key: "X-Content-Type-Options", value: "nosniff" },
						{ key: "X-Frame-Options", value: "DENY" },
						{
							key: "Referrer-Policy",
							value: "strict-origin-when-cross-origin",
						},
						{ key: "Content-Security-Policy", value: buildCSPHeader() },
						{ key: "Permissions-Policy", value: buildPermissionsPolicy() },
					],
				},
			];

			if (appType === "pwa") {
				headers.push({
					source: "/sw.js",
					headers: [
						{
							key: "Content-Type",
							value: "application/javascript; charset=utf-8",
						},
						{
							key: "Cache-Control",
							value: "no-cache, no-store, must-revalidate",
						},
						{
							key: "Content-Security-Policy",
							value: "default-src 'self'; script-src 'self'",
						},
					],
				});
			}

			return await Promise.resolve(headers);
		},
	};

	// Apply overrides if provided
	if (options?.overrides) {
		return deepMerge(baseConfig, options.overrides);
	}

	return baseConfig;
}

/**
 * Composes a Next.js configuration by applying a series of plugins to a base configuration.
 * Optionally accepts a final overrides object to customize the resulting configuration.
 *
 * @example
 * // With plugins only
 * import { withMDX } from "@zap/next-config/plugins/mdx";
 * import { withBundleAnalyzer } from "@zap/next-config/plugins/bundle-analyzer";
 * const base = createBaseConfig("pwa");
 * export default composeConfig(base, [withMDX, withBundleAnalyzer]);
 *
 * @example
 * // With plugins and overrides
 * const base = createBaseConfig("default");
 * export default composeConfig(base, [withMDX], {
 *   experimental: { serverActions: { bodySizeLimit: "3mb" } }
 * });
 */
export function composeConfig(
	baseConfig: NextConfig,
	plugins: Array<(config: NextConfig) => NextConfig>,
	overrides?: Partial<NextConfig>,
): NextConfig {
	const configWithPlugins = plugins.reduce(
		(acc, plugin) => plugin(acc),
		baseConfig,
	);

	if (overrides) {
		return deepMerge(configWithPlugins, overrides);
	}

	return configWithPlugins;
}
