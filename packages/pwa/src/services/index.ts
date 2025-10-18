import "server-only";

import { getUserIdService } from "@zap/auth/services";
import { db } from "@zap/db/drizzle";
import { PushNotificationError } from "@zap/errors";
import { eq } from "drizzle-orm";
import type webpush from "web-push";
import { pushNotifications } from "../db/drizzle/schema";
import type { VapidConfigs } from "../types";

let webpushInstance: typeof import("web-push") | null = null;

export async function getWebPushService(params: VapidConfigs) {
  if (webpushInstance) {
    return webpushInstance;
  }

  const { publicKey, privateKey, mail } = params;

  if (!(publicKey && privateKey && mail)) {
    throw new PushNotificationError(
      "Web Push service is not properly configured. Please check your VAPID keys and email settings."
    );
  }

  const webpushModule = await import("web-push");

  webpushModule.default.setVapidDetails(
    `mailto:${mail}`,
    publicKey,
    privateKey
  );

  webpushInstance = webpushModule.default;
  return webpushInstance;
}

type SubscribeUserService = {
  subscription: webpush.PushSubscription;
  vapidConfigs: VapidConfigs;
};

export async function subscribeUserToPushNotificationsService({
  subscription,
  vapidConfigs,
}: SubscribeUserService) {
  await getWebPushService(vapidConfigs);

  const userId = await getUserIdService();

  await db
    .insert(pushNotifications)
    .values({
      subscription,
      userId,
    })
    .onConflictDoUpdate({
      target: [pushNotifications.userId],
      set: {
        subscription,
      },
    });

  return { message: "User subscribed successfully" };
}

type UnsubscribeUserService = {
  vapidConfigs: VapidConfigs;
};

export async function unsubscribeUserFromPushNotificationsService({
  vapidConfigs,
}: UnsubscribeUserService) {
  await getWebPushService(vapidConfigs);

  const userId = await getUserIdService();

  await db
    .delete(pushNotifications)
    .where(eq(pushNotifications.userId, userId))
    .execute();

  return { message: "User unsubscribed successfully" };
}
