require('dotenv').config()

const StoryblokClient = require('storyblok-js-client');
let Storyblok = new StoryblokClient({
  accessToken: process.env.YUDHAWIJAYA_COM_STORYBLOK_TOKEN || ''
});

module.exports.fetch = (req, res, next) => {
  const lang = req.params.lang || ''

  Storyblok
    .get(
      'cdn/stories',
      {
        cv: Date.now(),
        per_page: 24,
        sort_by: 'first_published_at:desc',
        starts_with: `${ lang ? lang + '/' : '' }posts/`,
        version: 'published'
      }
    )
    .then((response) => {
      const description = lang === 'en' ? 'A collection of stories in yudhawijaya.com' : 'Kumpulan kisah di yudhawijaya.com'
      const image = 'https://a.storyblok.com/f/76789/480x640/7157934e9e/img_20150606_174246.jpg'
      const title = `${lang === 'en' ? 'Journals' : 'Jurnal'} – yudhawijaya.com`
      return res.json(
        {
          metas: {
            description,
            image,
            title,
          },
          stories: response.data.stories
        }
      )
    })
    .catch(next)
}
