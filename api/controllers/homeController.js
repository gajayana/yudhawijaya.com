require('dotenv').config()

const StoryblokClient = require('storyblok-js-client');
let Storyblok = new StoryblokClient({
  accessToken: process.env.YUDHAWIJAYA_COM_STORYBLOK_TOKEN || ''
});

module.exports.fetch = (req, res, next) => {
  const lang = req.params.lang || ''
  const module = req.params.module

  if ( module === 'page') {
    const url = lang ? `cdn/stories/${lang}/home` : 'cdn/stories/home'
    Storyblok
      .get(url, { version: 'published' })
      .then((response) => {
        return res.json(response.data.story.content.body)
      })
      .catch(next)
  }

  else if ( module === 'stories' ) {
    Storyblok
      .get(
        'cdn/stories',
        {
          cv: Date.now(),
          per_page: 6,
          sort_by: 'first_published_at:desc',
          starts_with: `${ lang ? lang + '/' : '' }posts/`,
          version: 'published'
        }
      )
      .then((response) => {
        return res.json(response.data.stories)
      })
      .catch(next)
  }

  else {
    return res.json({})
  }
}
