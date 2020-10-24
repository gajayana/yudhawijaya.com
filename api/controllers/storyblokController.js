require('dotenv').config()
const fs = require('fs')
const StoryblokClient = require('storyblok-js-client')
const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN || ''
})

module.exports.create = (req, res, next) => {
  const {
    body: {
      action = ''
    }
  } = req || {}

  if (action === 'published') {
    Storyblok
      .get('cdn/spaces/me')
      .then(({ data }) => {
        const {
          space: {
            version: cv = ''
          }
        } = data

        fs.writeFileSync(
          './static/sb.json',
          JSON.stringify({
            cv
          })
        )

        return res.status(200).json({ body: req.body })
      })
      .catch(next)
  } else {
    return res.status(400).json({ msg: 'no body' })
  }
}
