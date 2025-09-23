import { and, eq } from "drizzle-orm";

import type { InsertLocation } from "../schema";

import db from "..";
import { location } from "../schema";

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return db.query.location.findFirst({
    where: and(eq(location.name, existing.name), eq(location.userId, userId)),
  });
}

export async function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function insertLocation(insertable: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId,
  }).returning();
  return created;
}

export async function findLocationsByUser(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}
