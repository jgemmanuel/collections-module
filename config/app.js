'use strict'

// core modules
var path           = require('path');

// npm modules
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieSession  = require('cookie-session');
var stylus         = require('stylus');

// other
var packageJson    = require('../package.json');
var env            = process.env.NODE_ENV || 'development';
var port           = process.env.PORT || 3000;

global.App = {
  app: express(),
  version: packageJson.version,
  port: port,
  env: env,
  root: path.join(__dirname, '..'),
  appPath: function(path) {
    return this.root + '/' + path;
  },
  require: function(path) {
    return require(this.appPath(path));
  },
  start: function() {
    if (!this.started) {
      this.started = true;
      this.app.listen(this.port);
      console.log('Running App Version ' + App.version + ' on port ' + App.port + ' in ' + App.env + ' mode.');
    };
  },
  route: function(path) {
    return this.require('app/routes/' + path);
  }
};

// Views and templating
App.app.set('views', App.appPath('app/views'));
App.app.set('view engine', 'jade');
if (App.app.get('env') === 'development')
  App.app.locals.pretty = true;
// Stylus
App.app.use(stylus.middleware({
  src:  App.appPath('app/stylus'),
  dest: App.appPath('public'),
  debug: true,
  compile : function(str, path) {
    console.log('*** Stylus: compiling');
    return stylus(str)
      .set('filename', path)
      .set('warn', true)
      .set('compress', true);
  }
}));

// Middleware
App.app.use(bodyParser.json());
App.app.use(bodyParser.urlencoded({
  extended: true
}));
App.app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method.toLowerCase()
  }
}));
App.app.use(cookieSession({secret: 'sghSecret', key: 'sgh-session'}));
// App.app.use(csurf())
// App.app.use(App.middleware('attachCsrfToken')) // CSRF token
// App.app.use(require('connect-flash')())
// App.app.use(App.middleware('setFlash'))
App.app.use(express.static(App.appPath('public')));

// Error middlewares
// App.app.use(App.middleware('invalidCsrfToken'))

// Bootstrap the db
// App.require('config/database')(process.env.DATABASE_URL || 'mongodb://localhost/node_test')

App.require('config/routes')(App.app);
