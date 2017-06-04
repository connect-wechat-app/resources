var chalk = require('chalk');

var logger = {
  _times: {},
  debugLevel: process.env.LOG_LEVEL || 'debug',
  levels: [ 'error', 'warn', 'info', 'time', 'debug' ],
  colors: { error: 'red', warn: 'yellow', info: 'green' },
  color: function( level, message ){
    var color = logger.colors[ level ];
    if( color ){ return chalk[color]( message ) }else{ return message }
  },
  showLogLevel: function( level ){
    return logger.levels.indexOf( level ) <= logger.levels.indexOf( logger.debugLevel.toLowerCase() );
  },
  log: function( level, message ){
    if( logger.showLogLevel( level ) ){
      if( typeof message !== 'string' ) message = JSON.stringify( message );
      console.log( logger.color( level, [ new Date().toISOString(), level.toUpperCase(), message ].join( ':' ) ) );
    }
  },
  time: function( label ){
    logger._times[ label ] = Date.now();
  },
  timeEnd: function( label ){
    var time = logger._times[ label ];
    if( time ){
      var duration = Date.now() - time;
      logger.log( 'time', label + ": " + duration + "ms" );
    }
  }
}

logger.levels.forEach( function( lvl ){
  if( lvl != 'time' )
    logger[ lvl ] = function( message ){ logger.log( lvl, message ) };
})

module.exports = logger;
