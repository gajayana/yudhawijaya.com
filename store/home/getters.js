export default {
  metas(state) {
    const res = state.raw.story.content.body.find(ob => ob.component === 'meta')
    return res.page_metas
  },
  posts(state) {
    if (state.rawPosts) return state.rawPosts.stories
  },
  teaser(state) {
    if (state.raw) return state.raw.story.content.body.find(ob => ob.component === 'teaser')
  }
}
