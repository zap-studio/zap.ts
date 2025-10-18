import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { user } from "../tables/auth";

export const getUserIdFromMail = db
  .select({ userId: user.id })
  .from(user)
  .where(eq(user.email, sql.placeholder("email")))
  .limit(1)
  .prepare("getUserIdFromMail");

export const getLastMailSentAt = db
  .select({ lastEmailSentAt: user.lastEmailSentAt })
  .from(user)
  .where(eq(user.id, sql.placeholder("userId")))
  .limit(1)
  .prepare("getLastMailSentAt");
