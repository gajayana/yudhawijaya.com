export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname;

  // Only guard Storyblok API routes
  if (!path.startsWith("/api/storyblok/")) return;

  // Internal Nitro SSR calls (via localFetch) use unenv mock sockets.
  // The __unenv__ flag on the socket identifies these mock objects.
  // Real HTTP requests (browser, curl, scrapers) use real Node.js sockets.
  const socket = event.node.req.socket as unknown as
    | Record<string, unknown>
    | undefined;
  if (socket?.__unenv__) return;

  // Real HTTP requests must prove same-origin via Origin or Referer header
  const origin = getRequestHeader(event, "origin");
  const referer = getRequestHeader(event, "referer");

  const baseUrl =
    (useRuntimeConfig().public.baseUrl as string) ||
    getRequestURL(event).origin;
  const allowedOrigin = new URL(baseUrl).origin;

  if (origin === allowedOrigin) return;
  if (referer) {
    try {
      if (new URL(referer).origin === allowedOrigin) return;
    } catch {
      // invalid referer — fall through to 403
    }
  }

  // Block everything else
  throw createError({ statusCode: 403, statusMessage: "Forbidden" });
});
