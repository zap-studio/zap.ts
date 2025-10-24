import { and, eq, sql } from "drizzle-orm";

import { db } from "..";
import { aiProviderCredentials } from "../tables/ai";

export const getAiProviderCredentials = db
	.select()
	.from(aiProviderCredentials)
	.where(
		and(
			eq(aiProviderCredentials.userId, sql.placeholder("userId")),
			eq(aiProviderCredentials.provider, sql.placeholder("provider")),
		),
	)
	.limit(1)
	.prepare("getAiProviderCredentials");
