export default defineEventHandler(async (event) => {
  const { locale = "id" } = getQuery(event);
  const key = `${REDIS_KEY_PREFIX}:${locale}:works`;

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
  const stories = await withTimeout(
    storyblok.getAll("cdn/stories", {
      language: String(locale),
      version: "published",
      starts_with: "works",
      sort_by: "content.date_end:desc",
    }),
    5000,
  );

  return stories;
});
