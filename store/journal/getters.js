export default {
  body(state) {
    if (state.raw) return state.raw.story.content.body
  },
  excerpt(state) {
    if (state.raw) return state.raw.story.content.excerpt
  },
  featuredImage(state) {
    if (state.raw) return state.raw.story.content.featured_image
  },
  firstPublishedAt(state) {
    if (state.raw) return state.raw.story.first_published_at
  },
  title(state) {
    if (state.raw) return state.raw.story.content.title
  }
}
