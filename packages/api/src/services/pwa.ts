import "server-only";

import { PWA_CONFIG } from "@zap/config/features";
import { db } from "@zap/db/drizzle";
import { pushNotifications } from "@zap/db/drizzle/tables/pwa";
import { PushNotificationError } from "@zap/errors";
import type { VapidConfigs } from "@zap/types/pwa";
import { eq } from "drizzle-orm";
import type webpush from "web-push";
import { getUserIdService } from "./auth";

let webpushInstance: typeof import("web-push") | null = null;

export async function getWebPushService() {
  if (webpushInstance) {
    return webpushInstance;
  }

  const config: VapidConfigs = {
    publicKey: PWA_CONFIG.VAPID_PUBLIC_KEY,
    privateKey: PWA_CONFIG.VAPID_PRIVATE_KEY,
    mail: PWA_CONFIG.VAPID_MAIL,
  };

  const { publicKey, privateKey, mail } = config;

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
};

export async function subscribeUserToPushNotificationsService({
  subscription,
}: SubscribeUserService) {
  await getWebPushService();

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

export async function unsubscribeUserFromPushNotificationsService() {
  await getWebPushService();

  const userId = await getUserIdService();

  await db
    .delete(pushNotifications)
    .where(eq(pushNotifications.userId, userId))
    .execute();

  return { message: "User unsubscribed successfully" };
}
