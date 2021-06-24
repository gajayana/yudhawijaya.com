import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  cv: 0,
  language: 'id'
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_LANGUAGE: (state, payload: string) => (state.language = payload),
  SET_CV: (state, payload: number) => (state.cv = payload)
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ commit }, { app }) {
    const {
      data: {
        space: {
          version = ''
        }
      }
    } = await app.$storyapi.get('cdn/spaces/me')

    commit('SET_CV', version)
  }
}
