'use strict'

function connectAllRoutes(app) {
  App.require('config/routes/root')(app);
  App.require('config/routes/visit')(app);
  App.require('config/routes/carrier')(app);
  App.require('config/routes/archive')(app);
  App.require('config/routes/error')(app);
}

module.exports = connectAllRoutes;
