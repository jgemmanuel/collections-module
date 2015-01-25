'use strict'

function connectAllRoutes(app) {
  App.require('config/routes/root')(app)
  App.require('config/routes/error')(app)
}

module.exports = connectAllRoutes
