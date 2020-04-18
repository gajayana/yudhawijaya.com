const app = require('express')()

module.exports = { path: '/api', handler: app }

// controllers
const essentialsController = require('./controllers/essentialsController')
const homeController = require('./controllers/homeController')
const journalController = require('./controllers/journalController')
const journalsController = require('./controllers/journalsController')

// routes
app.get('/essentials/:module/:lang*?', essentialsController.fetch)
app.get('/home/:module/:lang*?', homeController.fetch)
app.get('/journal/:slug/:lang*?', journalController.fetch)
app.get('/journals/:lang*?', journalsController.fetch)

app.use((err, req, res, next) => {
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  })
})
