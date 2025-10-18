import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { AnyRouter, RouterClient } from "@orpc/server";

export function createFakeORPCClients<TRouter extends AnyRouter>() {
  const link = new RPCLink({ url: "" });

  const orpcClient: RouterClient<TRouter> = createORPCClient(link);
  const orpcReactQuery = createORPCReactQueryUtils(orpcClient);

  return {
    orpcClient,
    orpcReactQuery,
  };
}
