export default {
  setStory(state, payload) {
    state.story = Object.freeze(payload)
  },
}
