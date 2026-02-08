import StoryblokClient from "storyblok-js-client";

export default defineEventHandler(async (event) => {
  const { locale = "id" } = getQuery(event);
  const key = `${REDIS_KEY_PREFIX}:${locale}:works`;

  // Try Redis first
  try {
    const redis = getRedisClient();
    if (redis) {
      const cached = await redis.get(key);
      if (cached) return cached;
    }
  } catch {
    // Redis failed, fall through
  }

  // Fallback: fetch from Storyblok directly
  const token = process.env.NUXT_STORYBLOK_ACCESS_TOKEN;
  if (!token) {
    throw createError({ statusCode: 500, message: "Missing Storyblok token" });
  }

  const storyblok = new StoryblokClient({ accessToken: token });
  const stories = await storyblok.getAll("cdn/stories", {
    language: String(locale),
    version: "published",
    starts_with: "works",
    sort_by: "content.date_end:desc",
  });

  return stories;
});
