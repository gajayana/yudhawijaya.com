export default {
  setLang(state, payload) {
    state.lang = Object.freeze(payload)
  }
}
