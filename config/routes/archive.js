'use strict'

var express = require('express');
var custom = require (App.appPath('custom'))

function ArchiveRoutes(app) {
  var archiveRouter = express.Router();
  archiveRouter.route('/:visitNumber')
    .get(ArchiveRoute);
  app.use('/archive', archiveRouter);
}

module.exports = ArchiveRoutes;

function ArchiveRoute(req, res) {
  var visitNumber = req.params.visitNumber;
  var tmpa = visitNumber && custom.isInt(visitNumber) ? 'archive/index' : 'error/general';
  res.render(tmpa, {title: 'Send additional documents for visit ' + visitNumber});
};
