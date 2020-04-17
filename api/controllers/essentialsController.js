require('dotenv').config()

const StoryblokClient = require('storyblok-js-client');
let Storyblok = new StoryblokClient({
  accessToken: process.env.YUDHAWIJAYA_COM_STORYBLOK_TOKEN || ''
});

module.exports.fetch = (req, res, next) => {
  const lang = req.params.lang || ''
  const module = req.params.module

  if ( module === 'footer-text') {
    const url = lang ? `cdn/stories/${lang}/essentials/footer-text` : 'cdn/stories/essentials/footer-text'
    Storyblok
      .get(url, { cv: Date.now(), version: 'published' })
      .then((response) => {
        return res.json(response.data.story.content.main)
      })
      .catch(next)
  }

  else if ( module === 'menus' ) {
    const url = lang ? `cdn/stories/${lang}/essentials/menus` : 'cdn/stories/essentials/menus'
    Storyblok
      .get(url, { cv: Date.now(), version: 'published' })
      .then((response) => {
        return res.json(
          response
            .data
            .story
            .content
            .main
            .split('||')
            .map((ob) => {
              const a = ob.split('|')
              return {
                name: a[0],
                to: a[1],
              }
            })
        )
      })
      .catch(next)
  }

  else if ( module === 'social-accounts' ) {
    Storyblok
      .get('cdn/stories/essentials/social-accounts', { cv: Date.now(), version: 'published' })
      .then((response) => {
        return res.json(
          response
            .data
            .story
            .content
            .name
            .split('||')
            .map(ob => {
              const a = ob.split('|')
              return {
                icon: a[1].split(','),
                name: a[0]
              }
            })
        )
      })
      .catch(next)
  }
  else {
    return res.json({})
  }
}
