export const useSb = defineStore(
  'storyblok',
  {
    state: () => ({
      cv: 0
    }),

    actions: {
      setCv(version:number) {
        this.cv = version
      }
    }
  }
)