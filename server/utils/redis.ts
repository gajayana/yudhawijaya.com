import { Redis } from "@upstash/redis";

export const REDIS_KEY_STORYBLOK_CV = "com_yudhawijaya:storyblok:cache:version";

let redisClient: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

export async function getStoryblokCvFromRedis(): Promise<number | null> {
  try {
    const redis = getRedisClient();
    if (!redis) return null;

    const cv = await redis.get<number>(REDIS_KEY_STORYBLOK_CV);
    return cv ?? null;
  } catch {
    return null;
  }
}
