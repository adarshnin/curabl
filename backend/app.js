const dotenv = require("dotenv");
dotenv.config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
require("./db/conn");



var indexRouter = require('./routes/index');
var testAPIRouter = require('./routes/testAPI');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var slotRouter = require('./routes/schedules');
var generateSlot = require('./routes/generateSlot');
var paymentRouter = require('./routes/payment');
var getslotRouter = require('./routes/getslot');
var profileRouter = require('./routes/profile');
var reserveslotRouter = require('./routes/reserveSlots.js');
var BookSlotRouter =  require('./routes/booked');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter); // Profile
app.use('/testAPI', testAPIRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/addslot', slotRouter);
app.use('/generateSlot', generateSlot);
app.use('/getSlot', getslotRouter);
app.use('/reserveSlot', reserveslotRouter);
app.use('/payment', paymentRouter);
app.use('/bookSlot', BookSlotRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
