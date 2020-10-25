import sb from '~/static/sb.json'
export const actions = {
  nuxtServerInit ({ commit }, { app }) {
    // const {
    //   data: {
    //     space: {
    //       version = ''
    //     }
    //   }
    // } = await app.$storyapi.get('cdn/spaces/me')
    // consola.log(sb)
    commit('storyblok/setCv', sb.cv)
  }
}
