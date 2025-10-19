import "server-only";

import { withRpcHandler } from "@zap/errors/server/handlers/orpc";
import { authMiddleware } from "@zap/rpc/orpc/middlewares/auth";
import { base } from "@zap/rpc/orpc/middlewares/base";
import z from "zod";
import {
  getNumberOfUsersService,
  getSessionService,
  getUserIdFromMailService,
  getUserIdService,
  isAuthenticatedService,
  isUserAdminService,
} from "../../services";

export const isAuthenticated = base
  .use(authMiddleware)
  .handler(withRpcHandler(isAuthenticatedService));

export const getUserId = base
  .use(authMiddleware)
  .handler(withRpcHandler(getUserIdService));

export const getUserIdFromMail = base
  .input(
    z.object({
      email: z.email(),
    })
  )
  .handler(
    withRpcHandler(
      async ({ input }) =>
        await getUserIdFromMailService({ email: input.email })
    )
  );

export const getSession = base
  .use(authMiddleware)
  .handler(withRpcHandler(getSessionService));

export const isUserAdmin = base
  .use(authMiddleware)
  .handler(withRpcHandler(isUserAdminService));

export const getNumberOfUsers = base.handler(
  withRpcHandler(getNumberOfUsersService)
);
