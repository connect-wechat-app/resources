var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  
app.use(function(req, res, next){

  console.log("ADDING HEADERS");

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();

});



require('./routes/routes')(app);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));



//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(/^\/(?!api).*/, function(req, res) {
  
  var originalUrl = req.originalUrl;

  console.log(originalUrl)

  if(originalUrl.indexOf('/api') === -1){
    res.redirect('/#' + originalUrl);
  }

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var originalUrl = req.originalUrl;

  console.log(originalUrl)

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {

    var originalUrl = req.originalUrl;

    console.log(originalUrl)

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

  var originalUrl = req.originalUrl;

  console.log(originalUrl)

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
