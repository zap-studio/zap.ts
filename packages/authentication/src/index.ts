import { clerkClient } from "@clerk/tanstack-react-start/server";
import { Context, Layer } from "effect";

export { AuthenticationError } from "./errors";

export class Authentication extends Context.Tag("Authentication")<
  Authentication,
  ReturnType<typeof clerkClient>
>() {}

export const AuthenticationLive: Layer.Layer<Authentication> = Layer.sync(Authentication, () =>
  clerkClient(),
);
