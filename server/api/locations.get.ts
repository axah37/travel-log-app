import { findLocationsByUser } from "~~/shared/db/queries/location";

import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return findLocationsByUser(event.context.user.id);
});
