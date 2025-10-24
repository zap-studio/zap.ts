import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { feedbacks } from "../tables/feedbacks";

export const getUserFeedback = db
	.select()
	.from(feedbacks)
	.where(eq(feedbacks.userId, sql.placeholder("userId")))
	.limit(1)
	.prepare("getUserFeedback");

export const getAverageRating = db
	.select({
		rating: feedbacks.rating,
	})
	.from(feedbacks)
	.prepare("getAverageRating");
