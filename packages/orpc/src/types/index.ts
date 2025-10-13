import type { RouterClient } from "@orpc/server";
import type { router } from "../router";

export type Router = RouterClient<typeof router>;
