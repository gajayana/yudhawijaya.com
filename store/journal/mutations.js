export default {
  setError(state, payload) {
    state.error = Object.freeze(payload)
  },
  setRaw(state, payload) {
    state.raw = Object.freeze(payload)
  },
}
