import "server-only";

import {
  subscribeUserToPushNotificationsService,
  unsubscribeUserFromPushNotificationsService,
} from "@zap/api/services/pwa";
import { withRpcHandler } from "@zap/errors/server/handlers/orpc";
import { base } from "@zap/rpc/orpc/middlewares/base";
import { SubscriptionSchema } from "@zap/schemas/zod/pwa";
import { authMiddleware } from "../middlewares/auth";

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
