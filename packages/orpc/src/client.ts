import "client-only";

import { createORPCClient } from "@orpc/client";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { RouterClient } from "@orpc/server";
import type { router } from "@zap/orpc/router";
import { createLink } from "@zap/rpc/orpc/client";

export const link = createLink();
export const orpcClient: RouterClient<typeof router> = createORPCClient(link);
export const orpcReactQuery = createORPCReactQueryUtils(orpcClient);

export type ORPCClient = typeof orpcClient;
export type ORPCReactQuery = typeof orpcReactQuery;
