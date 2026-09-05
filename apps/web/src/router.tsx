import { createRouter } from "@tanstack/react-router";

import { RouteError } from "./components/error";
import { RouteNotFound } from "./components/not-found";
import { RoutePending } from "./components/pending";
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
