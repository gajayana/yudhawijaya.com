export default {
  setRaw(state, payload) {
    state.raw = Object.freeze(payload)
  },
}
