import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const checkAuth = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    throw redirect({ to: "/" });
  }

  return { isAuthenticated };
});

export const Route = createFileRoute("/_protected")({
  beforeLoad: () => checkAuth(),
  component: Outlet,
});
