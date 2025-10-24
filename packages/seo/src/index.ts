import { APP_DESCRIPTION, APP_NAME, BASE_URL } from "@zap/config";
import type { Metadata } from "next";

export const ZAP_DEFAULT_METADATA: Metadata = {
	title: APP_NAME,
	description: APP_DESCRIPTION,
	category: "technology",
	generator: "Next.js",
	applicationName: APP_NAME,
	referrer: "origin-when-cross-origin",
	keywords: [
		"Zap.ts",
		"typescript",
		"nextjs",
		"react",
		"boilerplate",
		"template",
		"web",
		"application",
	],
	authors: [
		{ name: "Alexandre Trotel", url: "https://www.alexandretrotel.org" },
	],
	creator: "Alexandre Trotel",
	publisher: "Alexandre Trotel",
	metadataBase: new URL(BASE_URL),
	openGraph: {
		title: APP_NAME,
		description: APP_DESCRIPTION,
		url: BASE_URL,
		siteName: APP_NAME,
		images: [
			{
				url: `${BASE_URL}/opengraph-image`,
				width: 1200,
				height: 630,
				alt: `${APP_NAME} Open Graph Image`,
			},
		],
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
		shortcut: "/favicon.ico",
	},
	twitter: {
		card: "summary_large_image",
		title: APP_NAME,
		description: APP_DESCRIPTION,
		creator: "@alexandretrotel",
		images: [`${BASE_URL}/opengraph-image`],
	},
	appleWebApp: {
		title: APP_NAME,
		statusBarStyle: "black-translucent",
		capable: true,
	},
	appLinks: {
		web: {
			url: BASE_URL,
			should_fallback: true,
		},
	},
};
