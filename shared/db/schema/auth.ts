import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: int("email_verified", { mode: "boolean" }).default(false).notNull(),
  image: text(),
  createdAt: int("created_at").notNull().$default(() => Date.now()),
  updatedAt: int("updated_at").notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const session = sqliteTable("session", {
  id: int().primaryKey({ autoIncrement: true }),
  expiresAt: int("expires_at").notNull(),
  token: text().notNull().unique(),
  createdAt: int("created_at").notNull().$default(() => Date.now()),
  updatedAt: int("updated_at").notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: int().primaryKey({ autoIncrement: true }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: int("access_token_expires_at"),
  refreshTokenExpiresAt: int("refresh_token_expires_at"),
  scope: text(),
  password: text(),
  createdAt: int("created_at").notNull().$default(() => Date.now()),
  updatedAt: int("updated_at").notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const verification = sqliteTable("verification", {
  id: int().primaryKey({ autoIncrement: true }),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: int("expires_at").notNull(),
  createdAt: int("created_at").notNull().$default(() => Date.now()),
  updatedAt: int("updated_at").notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
