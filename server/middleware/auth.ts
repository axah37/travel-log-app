import { auth } from "~~/shared/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  if (session?.user) {
    event.context.user = { ...session.user, id: Number(session.user.id) };
  }
  if (event.path.startsWith("/dashboard")) {
    if (!session) {
      await sendRedirect(event, "/", 302);
    }
  }
});
