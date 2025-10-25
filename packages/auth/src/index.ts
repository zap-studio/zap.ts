import type { AuthConfig } from "./types";

export const AUTH_CONFIG: AuthConfig = {
	PUBLIC_PATHS: [
		// Root
		"/",

		// Authentication
		"/login",
		"/register",
		"/forgot-password",
		"/reset-password",
		"/mail-verified",

		// Legal
		"/terms-of-service",
		"/privacy-policy",
		"/cookie-policy",

		// Public content
		"/blog",
		"/waitlist",

		// Meta & Analytics
		"/opengraph-image",
		"/_vercel/speed-insights/vitals",
		"/_vercel/insights/view",
	],
	URLS: {
		LOGIN: "/login",
		SIGN_UP: "/register",
		FORGOT_PASSWORD: "/forgot-password",
		EMAIL_VERIFICATION: "/mail-verified",
	},
	REDIRECT_URLS: {
		AFTER_SIGN_IN: "/app",
		AFTER_SIGN_UP: "/login",
	},
	FIELD_LENGTH: {
		USERNAME: {
			MIN: 3,
			MAX: 20,
		},
		PASSWORD: {
			MIN: 8,
			MAX: 128,
		},
	},
	MAILS: {
		REQUIRE_VERIFICATION: true,
	},
	SOCIAL_PROVIDERS: {
		ENABLED: false,
		PROVIDERS: ["github", "google"],
	},
	SECURITY: {
		PASSWORD_COMPROMISED_MESSAGE:
			"Your password has been found in a data breach. Please choose a different password.",
	},
};
