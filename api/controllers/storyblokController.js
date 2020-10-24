require('dotenv').config()
const fs = require('fs')
const StoryblokClient = require('storyblok-js-client')
const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN || ''
})

module.exports.create = async (req, res, next) => {
  const {
    body: {
      action= ''
    }
  } = req || {}

  if ( action === 'published' ) {
    const {
      data: {
        space: {
          version: cv = ''
        }
      }
    } = await Storyblok.get('cdn/spaces/me')

    fs.writeFileSync(
      './static/sb.json',
      JSON.stringify({
        cv
      })
    )
  }

  return res.status(200).json({ body: req.body })
}
