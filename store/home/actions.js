export default {
  async fetch({ commit }, payload) {
    try {
      const response = await payload.app.$storyapi.get('cdn/stories/home', { version: 'published' })
      commit('setError', '')
      commit('setRaw', response.data)
    } catch (error) {
      commit('setError', error)
    }
  }
}
