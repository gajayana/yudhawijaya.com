export default {
  async fetch({ commit }, { app, error, route, slug }) {
    try {
      const postUrl = route.query.hasOwnProperty('hl') && route.query.hl === 'en' ? `cdn/stories/en/posts/${slug}` : `cdn/stories/posts/${slug}`
      const { data } = await app.$storyapi.get(
        postUrl,
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
