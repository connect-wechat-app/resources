require('dotenv').config( { silent: true } );

var Q = require('q');
var mongoose = require('mongoose');
var config = require('../config/environment');
var logger = require('./logger');


module.exports = function( options ){
  
  var deferred = Q.defer();
  var mongoUri = config.mongo.uri();

  logger.log("mongoUri: " + mongoUri);
  
  options || ( options = {} );

  mongoose.connect(mongoUri, function (err) {
  
    if (err !== undefined) {
      logger.error('Unable to connect to DB (server.js): ' + err);
      deferred.reject( new Error( err ) );
    } else {
      logger.info('Connected to database: ' + config.mongo.safe_uri() );
      deferred.resolve();
    }

  });

  mongoose.connection.on( 'error', function( err ){ logger.error( err ); });
  mongoose.connection.on( 'connect', function( m ){ logger.info( m ); });

  return deferred.promise;

}
