import "client-only";

import { createORPCClient } from "@orpc/client";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { RouterClient } from "@orpc/server";
import { createLink } from "@zap/rpc/orpc/client";

import type { router } from "./router";

export const link = createLink();
export const orpcClient: RouterClient<typeof router> = createORPCClient(link);
export const orpcReactQuery = createORPCReactQueryUtils(orpcClient);
