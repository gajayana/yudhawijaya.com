import StoryblokClient from "storyblok-js-client";

// Dynamic URLs from Storyblok CMS
// Static pages are auto-discovered by Nuxt sitemap via nuxt:pages
export default defineSitemapEventHandler(async () => {
  try {
    // Try Redis first — reuse cached posts and works lists
    const redis = getRedisClient();
    if (redis) {
      const [posts, works] = await Promise.all([
        redis.get<{ slug: string }[]>(`${REDIS_KEY_PREFIX}:id:posts`),
        redis.get<{ slug: string }[]>(`${REDIS_KEY_PREFIX}:id:works`),
      ]);

      if (posts && works) {
        const journals = posts.flatMap((story) => [
          { loc: `/en/journals/${story.slug}`, _sitemap: "en-GB" },
          { loc: `/jurnal/${story.slug}`, _sitemap: "id-ID" },
        ]);

        const workUrls = works.flatMap((story) => [
          { loc: `/en/works/${story.slug}`, _sitemap: "en-GB" },
          { loc: `/karya/${story.slug}`, _sitemap: "id-ID" },
        ]);

        return [...journals, ...workUrls];
      }
    }
  } catch {
    // Redis failed, fall through to Storyblok API
  }

  // Fallback: fetch from Storyblok directly
  try {
    const Storyblok = new StoryblokClient({
      accessToken: process.env.NUXT_STORYBLOK_ACCESS_TOKEN,
    });

    const stories = await Storyblok.getAll("/cdn/stories", {
      version: "published",
    });

    const journals = stories
      .filter((story) => story.full_slug.includes("posts/"))
      .flatMap((story) => [
        { loc: `/en/journals/${story.slug}`, _sitemap: "en-GB" },
        { loc: `/jurnal/${story.slug}`, _sitemap: "id-ID" },
      ]);

    const works = stories
      .filter((story) => story.full_slug.includes("works/"))
      .flatMap((story) => [
        { loc: `/en/works/${story.slug}`, _sitemap: "en-GB" },
        { loc: `/karya/${story.slug}`, _sitemap: "id-ID" },
      ]);

    return [...journals, ...works];
  } catch {
    return [];
  }
});
