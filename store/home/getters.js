export default {
  metas(state) {
    const res = state.raw.story.content.body.find(ob => ob.component === 'meta')
    return res.page_metas
  },
  teaser(state) {
    if (state.raw) return state.raw.story.content.body.find(ob => ob.component === 'teaser')
  }
}
