import "server-only";

import { db } from "@zap/db/providers/drizzle";
import { PushNotificationError } from "@zap/errors";
import { eq } from "drizzle-orm";
import type webpush from "web-push";
import { pushNotifications } from "../db/providers/drizzle/schema";
import type { VapidConfigs } from "../types";

let webpushInstance: typeof import("web-push") | null = null;

export async function getWebPushService(params: VapidConfigs = {}) {
  if (webpushInstance) {
    return webpushInstance;
  }

  const { vapidPublicKey, vapidPrivateKey, vapidMail } = params;

  if (!(vapidPublicKey && vapidPrivateKey && vapidMail)) {
    throw new PushNotificationError(
      "Web Push service is not properly configured. Please check your VAPID keys and email settings."
    );
  }

  const webpushModule = await import("web-push");

  webpushModule.default.setVapidDetails(
    `mailto:${vapidMail}`,
    vapidPublicKey,
    vapidPrivateKey
  );

  webpushInstance = webpushModule.default;
  return webpushInstance;
}

type SubscribeUserService = {
  userId: string;
  subscription: webpush.PushSubscription;
  vapidConfigs: VapidConfigs;
};

export async function subscribeUserToPushNotificationsService({
  userId,
  subscription,
  vapidConfigs,
}: SubscribeUserService) {
  await getWebPushService(vapidConfigs);

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
  userId: string;
};

export async function unsubscribeUserFromPushNotificationsService({
  userId,
}: UnsubscribeUserService) {
  await getWebPushService();

  await db
    .delete(pushNotifications)
    .where(eq(pushNotifications.userId, userId))
    .execute();

  return { message: "User unsubscribed successfully" };
}
