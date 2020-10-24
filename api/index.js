const app = require('express')()
const bodyParser = require('body-parser')

module.exports = { path: '/api', handler: app }

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// controllers
const storyblokController = require('./controllers/storyblokController')

// routes
app.post('/sb/hook', storyblokController.create)

app.use((err, req, res, next) => {
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message
  })
})
