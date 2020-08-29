require('dotenv').config()

const StoryblokClient = require('storyblok-js-client');
let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN || ''
});

module.exports.fetch = (req, res, next) => {
  const lang = req.params.lang || ''
  const slug = req.params.slug

  if( !slug ) return res.status(200).json({})

  Storyblok
    .get(
      `cdn/stories/${ lang ? lang + '/' : ''}posts/${slug}`,
      {
        cv: Date.now(),
        version: 'published',
      }
    )
    .then((response) => {
      return res.status(200).json(response.data.story)
    })
    .catch(next)
}
