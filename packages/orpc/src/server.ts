import "server-only";

import { router } from "@zap/orpc/router";
import { createOrpcServer } from "@zap/rpc/orpc/server";

export const orpcServer = createOrpcServer(router);
