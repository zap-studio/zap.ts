import "server-only";

import { $authMiddleware } from "@zap/auth/rpc/middlewares";
import { withRpcHandler } from "@zap/errors/handlers";
import { base } from "@zap/rpc/middlewares";
import { InputSubscribeUserSchema } from "../../schemas";
import {
  subscribeUserToPushNotificationsService,
  unsubscribeUserFromPushNotificationsService,
} from "../../services";
import type { VapidConfigs } from "../../types";

type SubscribeUserParams = {
  vapidConfigs: VapidConfigs;
};

const $subscribeUserToPushNotifications = (params: SubscribeUserParams) =>
  base
    .use($authMiddleware())
    .input(InputSubscribeUserSchema)
    .handler(
      withRpcHandler(({ input }) =>
        subscribeUserToPushNotificationsService({
          subscription: input,
          vapidConfigs: params.vapidConfigs,
        })
      )
    );

const $unsubscribeUserFromPushNotifications = () =>
  base
    .use($authMiddleware())
    .handler(
      withRpcHandler(() => unsubscribeUserFromPushNotificationsService())
    );

export const $pwa = (vapidConfigs: VapidConfigs) => ({
  subscribeUserToPushNotifications:
    $subscribeUserToPushNotifications(vapidConfigs),
  unsubscribeUserFromPushNotifications: $unsubscribeUserFromPushNotifications(),
});
