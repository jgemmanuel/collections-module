'use strict'

var express = require('express');
var visitsRoute = App.route('visits');

function VisitsRoutes(app) {
  var visitsRouter = express.Router();
  visitsRouter.route('/')
    .get(visitsRoute.index);
  visitsRouter.route('/create')
    .get(visitsRoute.createGet)
    .post(visitsRoute.createPost);
  visitsRouter.route('/:visitNumber')
    .get(visitsRoute.overview);
  visitsRouter.route('/:visitNumber/edit')
    .get(visitsRoute.editGet)
    .post(visitsRoute.editPost);
  app.use('/visits', visitsRouter);
};

module.exports = VisitsRoutes;
