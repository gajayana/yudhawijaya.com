export default {
  setCv (state, payload) {
    state.cv = Object.freeze(payload)
  }
}
