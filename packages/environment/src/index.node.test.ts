import { createEnvironment } from "@zap-studio/env";
import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("env schema shape", () => {
  it("throws when a required server var is missing", () => {
    expect(() =>
      createEnvironment({
        server: { BETTER_AUTH_SECRET: z.string().min(32) },
        runtimeEnv: {},
        emptyStringAsUndefined: true,
      }),
    ).toThrow("BETTER_AUTH_SECRET");
  });

  it("parses when all required vars are present", () => {
    const env = createEnvironment({
      server: { BETTER_AUTH_SECRET: z.string().min(32) },
      runtimeEnv: { BETTER_AUTH_SECRET: "a".repeat(32) },
      emptyStringAsUndefined: true,
    });
    expect(env.BETTER_AUTH_SECRET).toHaveLength(32);
  });
});
