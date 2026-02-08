/**
 * Fetch all journal posts from Storyblok and cache in Upstash Redis.
 * Run with: pnpm sb:cache:posts
 *
 * Keys written:
 *   com_yudhawijaya:storyblok:cache:{locale}:posts        (array of all posts)
 *   com_yudhawijaya:storyblok:cache:{locale}:post:{slug}  (single post story)
 *
 * No TTL — values persist until overwritten by next cache run.
 */
import { Redis } from "@upstash/redis";
import StoryblokClient from "storyblok-js-client";

const KEY_PREFIX = "com_yudhawijaya:storyblok:cache";
const LOCALES = ["en", "id"];

async function main() {
  console.log("[sb-cache-posts] Starting posts cache update...");

  const storyblokToken = process.env.NUXT_STORYBLOK_ACCESS_TOKEN;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!storyblokToken) {
    console.error("[sb-cache-posts] Missing NUXT_STORYBLOK_ACCESS_TOKEN");
    process.exit(1);
  }

  if (!redisUrl || !redisToken) {
    console.error(
      "[sb-cache-posts] Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN",
    );
    process.exit(1);
  }

  const storyblok = new StoryblokClient({ accessToken: storyblokToken });
  const redis = new Redis({ url: redisUrl, token: redisToken });

  try {
    for (const locale of LOCALES) {
      console.log(`[sb-cache-posts] Fetching posts for locale: ${locale}...`);

      const stories = await storyblok.getAll("cdn/stories", {
        language: locale,
        version: "published",
        starts_with: "posts",
        sort_by: "first_published_at:desc",
      });

      console.log(
        `[sb-cache-posts] Got ${stories.length} posts for ${locale}`,
      );

      // Cache the full list
      const listKey = `${KEY_PREFIX}:${locale}:posts`;
      await redis.set(listKey, stories);
      console.log(`[sb-cache-posts] Cached list → ${listKey}`);

      // Cache each story individually
      for (const story of stories) {
        const slugKey = `${KEY_PREFIX}:${locale}:post:${story.slug}`;
        await redis.set(slugKey, story);
      }

      console.log(
        `[sb-cache-posts] Cached ${stories.length} individual posts for ${locale}`,
      );
    }

    console.log("[sb-cache-posts] Done!");
    process.exit(0);
  } catch (error) {
    console.error("[sb-cache-posts] Failed:", error);
    process.exit(1);
  }
}

main();
