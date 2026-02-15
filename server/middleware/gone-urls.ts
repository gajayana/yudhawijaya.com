export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const params = url.searchParams;

  // Return 410 Gone for spam/legacy query parameter URLs
  if (params.has("ngopo") || params.has("hl")) {
    throw createError({ statusCode: 410, statusMessage: "Gone" });
  }
});
