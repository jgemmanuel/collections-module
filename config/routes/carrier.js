'use strict'

var express = require('express');
var custom = require (App.appPath('custom'))

function CarrierRoutes(app) {
  var carrierRouter = express.Router();
  carrierRouter.route('/')
    .get(CarrierRoute);
  app.use('/carrier', carrierRouter);
}

module.exports = CarrierRoutes;

function CarrierRoute(req, res) {
  res.render('carrier/index', {title: 'Carrier Overview'});
};
