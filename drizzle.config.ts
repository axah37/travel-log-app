import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import env from "./shared/env";

export default defineConfig({
  out: "./shared/db/migration",
  schema: "./shared/db/schema/index.ts",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN,
  },
});
