import "server-only";

import { __PROD__ } from "../constants";
import { createDatabase } from "./utils";

// TODO: to change with t3-env later
const databaseUrls = {
  prod: process.env.DATABASE_URL_PROD || "",
  dev: process.env.DATABASE_URL_DEV || "",
};

export const db = createDatabase(databaseUrls, __PROD__);
