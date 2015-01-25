'use strict'

var express = require('express');

function errRoutes(app) {
  app.route('*').get(pageNotFound);
};

module.exports = errRoutes;

function pageNotFound(req, res) {
  res.render('error/404', {title: 'Not found'});
};
