'use strict'

var express = require('express');
var visitsRoute = App.route('visits');

function VisitsRoutes(app) {
  var visitsRouter = express.Router();
  visitsRouter.route('/')
    .get(visitsRoute.index);
  visitsRouter.route('/create')
    .get(visitsRoute.addNew)
    .post(visitsRoute.create);
  visitsRouter.route('/:visitNumber')
    .get(visitsRoute.edit);
  app.use('/visits', visitsRouter);
};

module.exports = VisitsRoutes;
