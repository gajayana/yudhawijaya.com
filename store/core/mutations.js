export default {
  setFooterText (state, payload) {
    state.footer_text = Object.freeze(payload)
  },
  setSocial (state, payload) {
    state.social = Object.freeze(payload)
  }
}
