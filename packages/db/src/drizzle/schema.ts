/**
 * Aggregates Drizzle schemas from various plugins.
 * Add or remove tables in the `schema` object below as needed.
 */
export const schema = {
  // AI
  userAISettings,

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
  feedback,

  // PWA
  pushNotifications,

  // Waitlist
  waitlist,
} as const;

export type DatabaseSchema = typeof schema;
