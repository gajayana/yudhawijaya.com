const app = require('express')()
const bodyParser = require('body-parser');
const consola = require('consola')

module.exports = { path: '/api', handler: app }

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// controllers
// const essentialsController = require('./controllers/essentialsController')
const storyblokController = require('./controllers/storyblokController')

// routes
// app.get('/essentials/:module/:lang*?', essentialsController.fetch)
app.post('/sb/hook', storyblokController.create)

app.use((err, req, res, next) => {
  consola.log(err)
  // return res.status(err.statusCode).json({
  //   status: err.statusCode,
  //   message: err.message
  // })
})
