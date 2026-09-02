import { clerkClient } from "@clerk/tanstack-react-start/server";
import { Context, Layer } from "effect";

export class Clerk extends Context.Tag("Clerk")<Clerk, ReturnType<typeof clerkClient>>() {}

export const ClerkLive: Layer.Layer<Clerk> = Layer.sync(Clerk, () => clerkClient());
