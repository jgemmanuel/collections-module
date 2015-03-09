'use strict'

var express = require('express');
var archiveHandlers = App.route('archive');

function ArchiveRoutes(app) {
  var archiveRouter = express.Router();
  archiveRouter.route('/')
    .get(archiveHandlers.index);
  archiveRouter.route('/:visitNumber')
    .get(archiveHandlers.create)
    .post(archiveHandlers.addNew);
  app.use('/archive', archiveRouter);
}

module.exports = ArchiveRoutes;
