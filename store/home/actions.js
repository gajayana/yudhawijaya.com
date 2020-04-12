export default {
  async fetch({ commit }, payload) {
    try {
      const { data } = await payload.app.$storyapi.get('cdn/stories/home', { version: 'published' })
      commit('setError', '')
      commit('setRaw', data)
    } catch (error) {
      commit('setError', error)
    }
  },
  async fetchPosts({ commit }, payload) {
    try {
      const { data } = await payload.app.$storyapi.get(
        'cdn/stories',
        {
          cv: Date.now(),
          per_page: 6,
          sort_by: 'first_published_at:desc',
          starts_with: 'posts/',
          version: 'published'
        }
      )
      commit('setError', '')
      commit('setRawPosts', data)
    } catch (error) {
      commit('setError', error)
    }
  }
}
