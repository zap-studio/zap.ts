import "server-only";

import { $authMiddleware } from "@zap/auth/rpc/orpc/middlewares";
import { withRpcHandler } from "@zap/errors/server/handlers/orpc";
import { base } from "@zap/rpc/orpc/middlewares/base";

import { SubscriptionSchema } from "../schemas";
import {
  subscribeUserToPushNotificationsService,
  unsubscribeUserFromPushNotificationsService,
} from "../services";
import type { VapidConfigs } from "../types";

type SubscribeUserParams = {
  vapidConfigs: VapidConfigs;
};

function $subscribeUserToPushNotifications(params: SubscribeUserParams) {
  return base
    .use($authMiddleware())
    .input(SubscriptionSchema)
    .handler(
      withRpcHandler(({ input }) =>
        subscribeUserToPushNotificationsService({
          subscription: input.subscription,
          vapidConfigs: params.vapidConfigs,
        })
      )
    );
}

type UnsubscribeUserParams = {
  vapidConfigs: VapidConfigs;
};

function $unsubscribeUserFromPushNotifications(params: UnsubscribeUserParams) {
  return base.use($authMiddleware()).handler(
    withRpcHandler(() =>
      unsubscribeUserFromPushNotificationsService({
        vapidConfigs: params.vapidConfigs,
      })
    )
  );
}

export function $pwa(vapidConfigs: VapidConfigs) {
  const params = { vapidConfigs };

  return {
    subscribeUserToPushNotifications: $subscribeUserToPushNotifications(params),
    unsubscribeUserFromPushNotifications:
      $unsubscribeUserFromPushNotifications(params),
  };
}
