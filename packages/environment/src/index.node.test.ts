import { createEnvironment } from "@zap-studio/env";
import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("env schema shape", () => {
  it("throws when a required server var is missing", () => {
    expect(() =>
      createEnvironment({
        server: { SOME_SECRET: z.string().min(32) },
        runtimeEnv: {},
        emptyStringAsUndefined: true,
      }),
    ).toThrow("SOME_SECRET");
  });

  it("parses when all required vars are present", () => {
    const env = createEnvironment({
      server: { SOME_SECRET: z.string().min(32) },
      runtimeEnv: { SOME_SECRET: "a".repeat(32) },
      emptyStringAsUndefined: true,
    });
    expect(env.SOME_SECRET).toHaveLength(32);
  });
});
