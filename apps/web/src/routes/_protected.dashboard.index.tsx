import { createFileRoute } from "@tanstack/react-router";

const Overview = () => {
  return <h2>Overview</h2>;
};

export const Route = createFileRoute("/_protected/dashboard/")({ component: Overview });
