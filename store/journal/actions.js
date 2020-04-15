export default {
  async fetch({ commit }, { app, error, slug }) {
    try {
      const { data } = await app.$storyapi.get(
        `cdn/stories/postss/${slug}`,
        {
          cv: Date.now(),
          version: 'published',
        }
      )
      commit('setRaw', data)
    } catch (err) {
      error({
        statusCode: err.statusCode,
        message: err.message,
      })
    }
  }
}
