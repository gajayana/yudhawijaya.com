import StoryblokClient from "storyblok-js-client";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug" });
  }

  const { locale = "id" } = getQuery(event);
  const key = `${REDIS_KEY_PREFIX}:${locale}:work:${slug}`;

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
  const { data } = await storyblok.get(`cdn/stories/works/${slug}`, {
    language: String(locale),
    version: "published",
  });

  return data?.story ?? null;
});
