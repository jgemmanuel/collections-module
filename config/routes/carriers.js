'use strict'

var express = require('express');
var custom = App.require('custom');

function CarriersRoutes(app) {
  var carriersRouter = express.Router();
  carriersRouter.route('/')
    .get(CarriersRoute);
  app.use('/carriers', carriersRouter);
}

module.exports = CarriersRoutes;

function CarriersRoute(req, res) {
  res.render('carriers/index', {title: 'Carrier Overview'});
};
