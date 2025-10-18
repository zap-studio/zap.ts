import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { RouterClient } from "@orpc/server";
import type { Router } from "./router";

/**
 * The RPC link to be used by the ORPC client.
 * It points to the `/rpc` endpoint of the current origin. (If `window` is not defined, it falls back to a specified URL or `http://localhost:3000`).
 *
 * @example
 * export const link = createLink();
 * export const orpcClient: RouterClient<typeof router> = createORPCClient(link);
 * export const orpcReactQuery = createORPCReactQueryUtils(orpcClient);
 */
export function createLink(fallbackUrl = "http://localhost:3000") {
  return new RPCLink({
    url: `${typeof window !== "undefined" ? window.location.origin : fallbackUrl}/rpc`,
  });
}

export const link = createLink();
export const orpcClient: RouterClient<Router> = createORPCClient(link);
export const orpcReactQuery = createORPCReactQueryUtils(orpcClient);

export type ORPCClient = typeof orpcClient;
export type ORPCReactQuery = typeof orpcReactQuery;
