/**
 * Store for managing Storyblok content version
 * Used for cache invalidation and content updates
 */
export const useSb = defineStore("storyblok", {
  state: () => ({
    cv: 0, // Content version number
  }),

  actions: {
    /**
     * Initialize content version from Storyblok API
     * Only runs once on server startup
     */
    async serverInit() {
      try {
        const storyblokApi = useStoryblokApi();

        const { data } = (await storyblokApi.get("cdn/spaces/me")) as {
          data: {
            space: { version: number };
          };
        };

        if (data?.space?.version) {
          this.cv = data.space.version;
        }
      } catch {
        // Silently fail - keep existing cv value on error
      }
    },

    /**
     * Update content version
     * @param version - New content version number
     */
    setCv(version: number) {
      if (version > 0) {
        this.cv = version;
      }
    },
  },
});
