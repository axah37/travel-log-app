import type { DrizzleError } from "drizzle-orm";

import db from "~~/shared/db";
import { insertLocation, location } from "~~/shared/db/schema";
import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import slugify from "slug";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }
  const body = await readValidatedBody(event, insertLocation.safeParse);
  if (!body.success) {
    const statusMessage = body.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}`).join("; ");

    const data = body.error.issues.reduce((errors, issue) => {
      errors[issue.path.join("")] = issue.message;
      return errors;
    }, {} as Record<string, string>);
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }
  const existingLocation = await db.query.location.findFirst({
    where: and(eq(location.name, body.data.name), eq(location.userId, event.context.user.id)),
  });
  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exists",
    }));
  }

  try {
    const [created] = await db.insert(location).values({
      ...body.data,
      slug: await generateUniqueSlug(body.data.name),
      userId: event.context.user.id,
    }).returning();
    return created;
  }
  catch (e) {
    const error = e as DrizzleError;
    const cause = error.cause as unknown & { message?: string };
    if (cause.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.slug") {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "Slug must be unique (the location name is used to generate the slug).",
      }));
    }
    throw e;
  }
});

async function generateUniqueSlug(name: string): Promise<string> {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
  let slug = slugify(name);
  let existing = !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));
  while (existing) {
    const idSlug = slug += `-${nanoid()}`;
    existing = !!(await db.query.location.findFirst({
      where: eq(location.slug, idSlug),
    }));
    if (!existing) {
      slug = idSlug;
    }
  }
  return slug;
}
