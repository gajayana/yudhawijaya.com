export default {
  setFooterText (state, payload) {
    state.footer_text = Object.freeze(payload)
  },
  setShowMobileMenu (state, payload) {
    state.show_mobile_menu = payload
  },
  setSocial (state, payload) {
    state.social = Object.freeze(payload)
  }
}
