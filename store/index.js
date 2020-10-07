export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    const {
      data: {
        space: {
          version = ''
        }
      }
    } = await app.$storyapi.get('cdn/spaces/me')

    commit('storyblok/setCv', version)
  }
}
