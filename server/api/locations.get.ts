import { findLocationsByUser } from "~~/shared/db/queries/location";

import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  return findLocationsByUser(event.context.user.id);
});
