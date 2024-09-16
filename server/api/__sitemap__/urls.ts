import StoryblokClient from 'storyblok-js-client'

export default defineSitemapEventHandler(async () => {
  const Storyblok = new StoryblokClient({
    accessToken: process.env.NUXT_STORYBLOK_ACCESS_TOKEN
  })
  try {
    const stories = await Storyblok.getAll('/cdn/stories', {
      version: 'published'
    })

    const journals = stories
      .filter(story => story.full_slug.includes('posts/'))
      .flatMap(story => [
        { loc: `/en/journals/${story.slug}`, _sitemap: 'en-GB' },
        { loc: `/jurnal/${story.slug}`, _sitemap: 'id-ID' }
      ])

    const works = stories
      .filter(story => story.full_slug.includes('works/'))
      .flatMap(story => [
        { loc: `/en/works/${story.slug}`, _sitemap: 'en-GB' },
        { loc: `/karya/${story.slug}`, _sitemap: 'id-ID' }
      ])

    return [
      ...journals,
      ...works
    ]
  } catch (error) {
    // console.error(error)
    return [] // return an empty array in case of error
  }
})
