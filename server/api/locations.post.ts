import type { DrizzleError } from "drizzle-orm";

import { findLocationByName, findLocationBySlug, insertLocation } from "~~/shared/db/queries/location";
import { InsertLocation } from "~~/shared/db/schema";
import { customAlphabet } from "nanoid";
import slugify from "slug";

import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }
  const result = await readValidatedBody(event, InsertLocation.safeParse);
  if (!result.success) {
    const statusMessage = result.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}`).join("; ");

    const data = result.error.issues.reduce((errors, issue) => {
      errors[issue.path.join("")] = issue.message;
      return errors;
    }, {} as Record<string, string>);
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }
  const existingLocation = await findLocationByName(result.data, event.context.user.id);
  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exists",
    }));
  }

  try {
    return insertLocation(result.data, await generateUniqueSlug(result.data.name), event.context.user.id);
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
  let existing = !!(await findLocationBySlug(slug));
  while (existing) {
    const idSlug = slug += `-${nanoid()}`;
    existing = !!(await findLocationBySlug(idSlug));
    if (!existing) {
      slug = idSlug;
    }
  }
  return slug;
}
