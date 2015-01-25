'use strict'

var express = require('express');

function RootRoutes(app) {
  var rootRouter = express.Router();
  rootRouter.route('/')
    .get(HomeRoute);
  app.use('/', rootRouter);
}

module.exports = RootRoutes;

function HomeRoute(req, res) {
  res.render('home', {title: 'Claim View'});
};
