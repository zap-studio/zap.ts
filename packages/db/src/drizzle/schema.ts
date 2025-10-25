import { aiProviderCredentials } from "./tables/ai";
import {
	account,
	invitation,
	member,
	organization,
	passkey,
	session,
	twoFactor,
	user,
	verification,
} from "./tables/auth";
import { feedbacks } from "./tables/feedbacks";
import { pushNotifications } from "./tables/pwa";
import { waitlist } from "./tables/waitlist";

/**
 * Aggregates Drizzle schemas from various plugins.
 * Add or remove tables in the `schema` object below as needed.
 */
export const schema = {
	// AI
	aiProviderCredentials,

	// Auth
	user,
	session,
	account,
	verification,
	twoFactor,
	passkey,
	organization,
	member,
	invitation,

	// Feedbacks
	feedbacks,

	// PWA
	pushNotifications,

	// Waitlist
	waitlist,
} as const;

export type DatabaseSchema = typeof schema;
