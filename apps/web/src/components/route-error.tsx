export const RouteError = ({ error }: { error: Error }) => (
  <div>
    <h1>Something went wrong</h1>
    <p>{error.message}</p>
  </div>
);
