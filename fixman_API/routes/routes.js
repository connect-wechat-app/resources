'use strict';

var config = require('../config/environment');

module.exports = function (app) {

  app.set('appPath', config.clientDir);

  app.set('secret_token', config.secrets.app_secret);

  console.log("secret: " , app.get('secret_token'))
  console.log("appPath: " , app.get('appPath'))

  // API

  var normalizedPath = require("path").join(__dirname, "./api");

  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    app.use('/api/' + file, require('./api/' + file));
  });


  app
    .route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      console.log("Requested: " + req.url);
      res.sendFile( app.get('appPath') +  req.url, { root: config.root } );
    });

  app
    .route('/*')
    .get(function (req, res) {
      res.sendFile( app.get('appPath') + '/index.html', { root: config.root } );
    });

};
