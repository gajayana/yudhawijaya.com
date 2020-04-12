export default {
  async fetch({ commit }, payload) {
    try {
      const { data } = await payload.app.$storyapi.get(
        `cdn/stories/posts/${payload.slug}`,
        {
          cv: Date.now(),
          version: 'published',
        }
      )
      commit('setRaw', data)
      commit('setError','')
    } catch (error) {
      commit('setError', error)
    }
  }
}
