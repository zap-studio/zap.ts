import { createEnvironment } from "@zap-studio/env";

import { schema } from "./schema";

export const env = createEnvironment({
  ...schema,
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
