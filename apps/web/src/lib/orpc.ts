import { createOrpcClient } from "@zap/rpc/orpc/client";

export const { link, orpcClient, orpcReactQuery } = createOrpcClient(
  process.env.NEXT_PUBLIC_ORPC_FALLBACK_URL // TODO: use with t3-env and maybe compose already existing env vars
);

export type ORPCClient = typeof orpcClient;
export type ORPCReactQuery = typeof orpcReactQuery;
