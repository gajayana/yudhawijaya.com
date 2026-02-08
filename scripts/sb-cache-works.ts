/**
 * Fetch all works from Storyblok and cache in Upstash Redis.
 * Run with: pnpm sb:cache:works
 *
 * Keys written:
 *   com_yudhawijaya:storyblok:cache:{locale}:works        (array of all works)
 *   com_yudhawijaya:storyblok:cache:{locale}:work:{slug}  (single work story)
 *
 * No TTL — values persist until overwritten by next cache run.
 */
import { Redis } from "@upstash/redis";
import StoryblokClient from "storyblok-js-client";

const KEY_PREFIX = "com_yudhawijaya:storyblok:cache";
const LOCALES = ["en", "id"];

async function main() {
  console.log("[sb-cache-works] Starting works cache update...");

  const storyblokToken = process.env.NUXT_STORYBLOK_ACCESS_TOKEN;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!storyblokToken) {
    console.error("[sb-cache-works] Missing NUXT_STORYBLOK_ACCESS_TOKEN");
    process.exit(1);
  }

  if (!redisUrl || !redisToken) {
    console.error(
      "[sb-cache-works] Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN",
    );
    process.exit(1);
  }

  const storyblok = new StoryblokClient({ accessToken: storyblokToken });
  const redis = new Redis({ url: redisUrl, token: redisToken });

  try {
    for (const locale of LOCALES) {
      console.log(`[sb-cache-works] Fetching works for locale: ${locale}...`);

      const stories = await storyblok.getAll("cdn/stories", {
        language: locale,
        version: "published",
        starts_with: "works",
        sort_by: "content.date_end:desc",
      });

      console.log(
        `[sb-cache-works] Got ${stories.length} works for ${locale}`,
      );

      // Cache the full list
      const listKey = `${KEY_PREFIX}:${locale}:works`;
      await redis.set(listKey, stories);
      console.log(`[sb-cache-works] Cached list → ${listKey}`);

      // Cache each story individually
      for (const story of stories) {
        const slugKey = `${KEY_PREFIX}:${locale}:work:${story.slug}`;
        await redis.set(slugKey, story);
      }

      console.log(
        `[sb-cache-works] Cached ${stories.length} individual works for ${locale}`,
      );
    }

    console.log("[sb-cache-works] Done!");
    process.exit(0);
  } catch (error) {
    console.error("[sb-cache-works] Failed:", error);
    process.exit(1);
  }
}

main();
