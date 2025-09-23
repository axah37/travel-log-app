import type { User } from "better-auth";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "./db/index";
import env from "./env";

export type UserWithId = Omit<User, "id"> & { id: number };

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    camelCase: false,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
});
