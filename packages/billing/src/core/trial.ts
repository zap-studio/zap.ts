export const resolveTrialDays = (
  planTrialDays?: number,
  defaultTrialDays?: number,
): number | undefined => planTrialDays ?? defaultTrialDays;

export const withTrialDays = <T extends object>(
  opts: T,
  trialDays: number | undefined,
): T & { trialDays?: number } => {
  if (trialDays === undefined) {
    return opts;
  }

  return { ...opts, trialDays };
};
