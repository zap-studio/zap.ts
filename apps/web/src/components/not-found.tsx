import { Link } from "@tanstack/react-router";

export const RouteNotFound = () => (
  <div>
    <h1>Page not found</h1>
    <Link to="/">Go home</Link>
  </div>
);
