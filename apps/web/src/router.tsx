import { createRouter } from "@tanstack/react-router";

import { RouteError } from "./components/route-error";
import { RouteNotFound } from "./components/route-not-found";
import { RoutePending } from "./components/route-pending";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultNotFoundComponent: RouteNotFound,
    defaultErrorComponent: RouteError,
    defaultPendingComponent: RoutePending,
  });
