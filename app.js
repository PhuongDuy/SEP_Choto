var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'),
https = require('https'),
bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    MongoClient = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID,
    assert = require('assert'),
    User = require('./models/User'),
    About = require('./models/About'),
    Post = require('./models/Post'),
    PostStatus = require('./models/PostStatus'),
    ProductType = require('./models/ProductType'),
    UserStatus = require('./models/UserStatus'),
    multer = require('multer'),
    mongoose = require('mongoose');
var logger = require('morgan');

var promsie = "mongodb://localhost:27017/SEPK21T1";
mongoose.connect(promsie);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((req, res, next) => {
  var err = new Error("Không tìm thấy hoặc có thể trang đang được phát. Vui lòng quay lại sau...");
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
