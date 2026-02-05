// These lines of code should only run on server
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(async (_nuxtApp) => {
  const sb = useSb();

  // Try Redis first (fast, ~5ms)
  try {
    const { getStoryblokCvFromRedis } = await import("~/server/utils/redis");
    const redisCv = await getStoryblokCvFromRedis();
    if (redisCv && redisCv > 0) {
      sb.setCv(redisCv);
      return;
    }
  } catch {
    // Redis failed, fall through to Storyblok API
  }

  // Fallback to Storyblok API (slow)
  await sb.serverInit();
});
