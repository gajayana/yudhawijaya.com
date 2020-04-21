export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    const me = await app.$storyapi.get('cdn/spaces/me')

    commit('storyblok/setCv', me.data.space.version)
  }
}
