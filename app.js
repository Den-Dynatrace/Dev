require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var injectRouter = require('./routes/injectDoc');
var managerRouter = require('./routes/manager');
var authRouter = require('./routes/auth');
var logRouteRouter = require('./routes/logRoute');
var newUserRouter = require('./routes/newUser');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false, // set this to true on production
  }
}));


app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/injectDoc', injectRouter);
app.use('/manager', managerRouter);
app.use('/auth', authRouter);
app.use('/logRoute', logRouteRouter);
app.use('/newUser', newUserRouter);
app.use('/test', testRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
