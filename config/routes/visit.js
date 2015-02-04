'use strict'

var express = require('express');

function VisitRoutes(app) {
  var visitRouter = express.Router();
  visitRouter.route('/')
    .get(HomeRedirect);
  visitRouter.route('/:visitNumber')
    .get(VisitRoute);
  app.use('/visit', visitRouter);
}

module.exports = VisitRoutes;

function HomeRedirect(req, res) {
  res.redirect('/');
};

function VisitRoute(req, res) {
  var visitNumber = req.params.visitNumber;
  res.render('visit/index', {title: 'Visit ' + visitNumber});
};
