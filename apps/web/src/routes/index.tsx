import { createFileRoute } from "@tanstack/react-router";

const Home = () => <h1>zap.ts</h1>;

export const Route = createFileRoute("/")({ component: Home });
