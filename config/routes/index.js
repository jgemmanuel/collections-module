'use strict'

function connectAllRoutes(app) {
  App.require('config/routes/root')(app);
  App.require('config/routes/visits')(app);
  App.require('config/routes/carriers')(app);
  App.require('config/routes/archive')(app);
  App.require('config/routes/error')(app);
}

module.exports = connectAllRoutes;
