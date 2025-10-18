import { z } from "zod";

export const SubscriptionSchema = z.object({
  subscription: z.object({
    endpoint: z.string(),
    keys: z.object({
      auth: z.string(),
      p256dh: z.string(),
    }),
  }),
});
