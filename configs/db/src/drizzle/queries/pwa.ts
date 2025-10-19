import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { pushNotifications } from "../tables/pwa";

export const getUserPushSubscription = db.query.pushNotifications
  .findFirst({
    where: eq(pushNotifications.userId, sql.placeholder("userId")),
  })
  .prepare("getUserPushSubscription");
