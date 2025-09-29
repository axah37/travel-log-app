import { findLocation } from "~~/shared/db/queries/location";

import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") as string;
  const location = await findLocation(slug, event.context.user.id);

  if (!location) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: `Location with slug ${slug} not found.`,
    }));
  }
  return location;
});
