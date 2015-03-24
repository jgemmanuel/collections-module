'use strict'

var express = require('express');
var routeHandlers = App.route('carriers');

function CarriersRoutes(app) {
  var carriersRouter = express.Router();
  carriersRouter.route('/')
    .get(routeHandlers.index);
  carriersRouter.route('/create')
    .get(routeHandlers.createGet)
    .post(routeHandlers.createPost);
  carriersRouter.route('/:carrierName')
    .get(routeHandlers.overview);
  app.use('/carriers', carriersRouter);
}

module.exports = CarriersRoutes;
