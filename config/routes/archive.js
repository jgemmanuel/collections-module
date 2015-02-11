'use strict'

var express = require('express');
var custom = require (App.appPath('custom'));

function ArchiveRoutes(app) {
  var archiveRouter = express.Router();
  archiveRouter.route('/')
    .get(ArchiveRoute);
  archiveRouter.route('/:visitNumber')
    .get(ArchiveRouteCreate);
  app.use('/archive', archiveRouter);
}

module.exports = ArchiveRoutes;

function ArchiveRoute(req, res) {
  res.render('archive/index', {title: 'Search Archive'});
};

function ArchiveRouteCreate(req, res) {
  var visitNumber = req.params.visitNumber;
  var tmpa = visitNumber && custom.isInt(visitNumber) ? 'archive/create' : 'error/general';
  res.render(tmpa, {title: 'Create an outbound document for visit ' + visitNumber});
};
