require('dotenv').config({ silent: true });


var path 		= require('path');
var _ 			= require('lodash');
var env  		= process.env.NODE_ENV || 'development';


function envVar( name ){
 
	var value, full_name = [ env.toUpperCase(), name ].join('_');

	if( value = process.env[ full_name ] ) return value; else return process.env[ name ];

}

console.log("Root: " + path.normalize(__dirname + '../../'));

var port 		= envVar( 'PORT') || 3000

var config 	= module.exports = {
  env 				: env,
  root				: path.normalize(__dirname + '../../'),
  port 				: port,
  clientDir 	: process.env.CLIENT_DIR || './public',

  mongo: {
    safe_uri: function(){
      return "mongodb://" + config.mongo.username + "@" + config.mongo.server + "/" + config.mongo.db_name;
    },    
    uri: function(){
      return "mongodb://" + config.mongo.username + ":" + config.mongo.password + "@" + config.mongo.server + "/" + config.mongo.db_name;
    },
    username: envVar( 'MONGO_USERNAME' ),
    password: envVar( 'MONGO_PASSWORD' ),
    server:   envVar( 'MONGO_SERVER' ),
    db_name:  envVar( 'MONGO_DBNAME' ),
    options: {
      db: {
        safe: true
      }
    }
  },
  secrets: {
    app_secret   : process.env.APPSECRET || 'f1x',
    cryto     : 'f1X'
  }
};
