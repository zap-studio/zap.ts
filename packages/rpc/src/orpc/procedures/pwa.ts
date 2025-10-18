import "server-only";

import {
  subscribeUserToPushNotificationsService,
  unsubscribeUserFromPushNotificationsService,
} from "@zap/api/services/pwa";
import { withRpcHandler } from "@zap/errors/server/handlers/orpc";
import { SubscriptionSchema } from "@zap/schemas/zod/features/pwa";
import { authMiddleware } from "../middlewares/auth";
import { base } from "../middlewares/base";

const subscribeUserToPushNotifications = base
  .use(authMiddleware)
  .input(SubscriptionSchema)
  .handler(
    withRpcHandler(({ input }) =>
      subscribeUserToPushNotificationsService({
        subscription: input.subscription,
      })
    )
  );

const unsubscribeUserFromPushNotifications = base
  .use(authMiddleware)
  .handler(withRpcHandler(() => unsubscribeUserFromPushNotificationsService()));

export const pwa = {
  subscribeUserToPushNotifications,
  unsubscribeUserFromPushNotifications,
};
