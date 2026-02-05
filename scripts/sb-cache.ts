/**
 * Standalone script to fetch Storyblok cv and cache it in Upstash Redis.
 * Run with: pnpm sb:cache
 *
 * This script is intended to be run:
 * - During build/deployment
 * - Via Storyblok webhook on content publish
 */
import { Redis } from "@upstash/redis";
import StoryblokClient from "storyblok-js-client";

const REDIS_KEY_STORYBLOK_CV = "com_yudhawijaya:storyblok:cache:version";

async function main() {
  console.log("[sb-cache] Starting Storyblok cv cache update...");

  const storyblokToken = process.env.NUXT_STORYBLOK_ACCESS_TOKEN;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!storyblokToken) {
    console.error("[sb-cache] Missing NUXT_STORYBLOK_ACCESS_TOKEN");
    process.exit(1);
  }

  if (!redisUrl || !redisToken) {
    console.error(
      "[sb-cache] Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN",
    );
    process.exit(1);
  }

  const storyblok = new StoryblokClient({ accessToken: storyblokToken });

  try {
    console.log("[sb-cache] Fetching cv from Storyblok...");
    const { data } = await storyblok.get("cdn/spaces/me");
    const cv = data?.space?.version;

    if (!cv || typeof cv !== "number") {
      console.error("[sb-cache] Invalid cv from Storyblok:", cv);
      process.exit(1);
    }

    console.log(`[sb-cache] Got cv from Storyblok: ${cv}`);

    const redis = new Redis({ url: redisUrl, token: redisToken });
    await redis.set(REDIS_KEY_STORYBLOK_CV, cv);

    console.log(`[sb-cache] Successfully cached cv ${cv} in Redis`);
    process.exit(0);
  } catch (error) {
    console.error("[sb-cache] Failed to update cache:", error);
    process.exit(1);
  }
}

main();
