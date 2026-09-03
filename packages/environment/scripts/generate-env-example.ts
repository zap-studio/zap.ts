import { generateEnvironmentExample } from "@zap-studio/env/generate-env-example";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { schema } from "../src/schema";

const outputPath = fileURLToPath(new URL("../../../.env.example", import.meta.url));

writeFileSync(outputPath, generateEnvironmentExample(schema));

console.log(`Wrote ${outputPath}`);
