export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug" });
  }

  const { locale = "id" } = getQuery(event);
  const key = `${REDIS_KEY_PREFIX}:${locale}:post:${slug}`;

  // Try Redis first (3s timeout)
  try {
    const redis = getRedisClient();
    if (redis) {
      const cached = await withTimeout(redis.get(key), 3000);
      if (cached) return cached;
    }
  } catch {
    // Redis failed or timed out, fall through
  }

  // Fallback: fetch from Storyblok (5s timeout)
  const storyblok = getStoryblokClient();
  const { data } = await withTimeout(
    storyblok.get(`cdn/stories/posts/${slug}`, {
      language: String(locale),
      version: "published",
    }),
    5000,
  );

  return data?.story ?? null;
});
