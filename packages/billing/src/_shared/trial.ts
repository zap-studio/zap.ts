export const resolveTrialDays = (
  planTrialDays?: number,
  defaultTrialDays?: number,
): number | undefined => planTrialDays ?? defaultTrialDays;

export const isTrialActive = (trialEndsAt: Date | null, now: Date = new Date()): boolean =>
  trialEndsAt !== null && trialEndsAt.getTime() > now.getTime();

export const withTrialDays = <T extends object>(
  opts: T,
  trialDays: number | undefined,
): T & { trialDays?: number } => {
  if (trialDays === undefined) {
    return opts;
  }

  return { ...opts, trialDays };
};
