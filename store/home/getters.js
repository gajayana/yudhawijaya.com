export default {
  teaser(state) {
    if (!state.raw) return
    return state.raw.story.content.body.find(ob => ob.component === 'teaser')
  }
}
