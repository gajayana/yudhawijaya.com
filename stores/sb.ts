export const useSb = defineStore(
  'storyblok',
  {
    state: () => ({
      cv: 0
    }),

    actions: {
      // runs only on server init
      async serverInit () {
        // fetch storyblok space latest version
        const storyblokApi = useStoryblokApi()
        const { data }: { data: StoryblokSpace } = await storyblokApi.get(
          'cdn/spaces/me'
        )
        this.setCv(data.space.version)
      },
      setCv (version:number) {
        this.cv = version
      }
    }
  }
)
