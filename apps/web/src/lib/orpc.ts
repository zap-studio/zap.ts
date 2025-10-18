import { createOrpcClient } from "@zap/rpc/orpc/client";
import { env } from "@/env";

export const { link, orpcClient, orpcReactQuery } = createOrpcClient(
  env.NEXT_PUBLIC_SITE_URL
);

export type ORPCClient = typeof orpcClient;
export type ORPCReactQuery = typeof orpcReactQuery;
