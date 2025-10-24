import { count } from "drizzle-orm";
import { db } from "..";
import { waitlist } from "../tables/waitlist";

export const getWaitlistCount = db
	.select({
		count: count(),
	})
	.from(waitlist)
	.prepare("getWaitlistCount");
