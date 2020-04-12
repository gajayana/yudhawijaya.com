export default {
  setError(state, payload) {
    state.error = payload
  },
  setRawPosts(state, payload) {
    state.rawPosts = Object.freeze(payload)
  },
  setRaw(state, payload) {
    state.raw = Object.freeze(payload)
  },
}
