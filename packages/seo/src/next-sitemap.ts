import type { IConfig } from "next-sitemap";

export function createBaseConfig(SITE_URL = "http://localhost:3000"): IConfig {
  return {
    siteUrl: SITE_URL,
    changefreq: "daily",
    priority: 0.7,
    generateRobotsTxt: true,
    exclude: ["/server-sitemap-index.xml", "/404", "/admin/**", "/api/**"],
    alternateRefs: [
      {
        href: SITE_URL,
        hreflang: "en",
      },
      {
        href: `${SITE_URL}/fr`,
        hreflang: "fr",
      },
      {
        href: `${SITE_URL}/pt`,
        hreflang: "pt",
      },
    ],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      additionalSitemaps: [`${SITE_URL}/server-sitemap-index.xml`],
    },
  };
}

export function createNextSitemapConfig(
  siteUrl?: string,
  overrides: Partial<IConfig> = {}
): IConfig {
  return {
    ...createBaseConfig(siteUrl),
    ...overrides,
  };
}
