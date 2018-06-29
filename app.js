var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'),
    https = require('https'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    session = require('express-session'),
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
    validator = require('express-validator'),
    multer = require('multer'),
    mongoMemory = require('connect-mongo')(session),
    mongoose = require('mongoose');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');


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
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: '{secret}', name: 'session_id', saveUninitialized: true, resave: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: new Date(Date.now() + 10800000) }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://DuyHo:hothanhphuongduy2101@ds121251.mlab.com:21251/sep_team5_k21t1")
    .then(() => console.log("Connect thanh cong"))
    .catch((err) => console.log("Connect that bai"));
require('./config/passport');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use((req, res, next) => {
    var err = new Error("Không tìm thấy hoặc có thể trang đang được phát. Vui lòng quay lại sau...");
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
