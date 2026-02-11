import { Redis } from "@upstash/redis";
import StoryblokClient from "storyblok-js-client";

export const REDIS_KEY_PREFIX = "com_yudhawijaya:storyblok:cache";

let redisClient: Redis | null = null;
let storyblokClient: StoryblokClient | null = null;

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

export function getStoryblokClient(): StoryblokClient {
  if (storyblokClient) return storyblokClient;

  const token = process.env.NUXT_STORYBLOK_ACCESS_TOKEN;
  if (!token) {
    throw createError({ statusCode: 500, message: "Missing Storyblok token" });
  }

  storyblokClient = new StoryblokClient({ accessToken: token });
  return storyblokClient;
}

/** Race a promise against a timeout. Rejects on expiry. */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); },
    );
  });
}
