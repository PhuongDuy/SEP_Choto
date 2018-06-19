var passport = require('passport'),
    User = require('../models/User'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose');

    passport.serializeUser((account, done) => {
        done(null, account.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, account) => {
            done(err, account);
        });
    });
    //login
    passport.use('login', new LocalStrategy({
        usernameField: 'Email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, Email, Password, done) => {  
        req.checkBody('Email','Email không đúng').notEmpty().isEmail();
        req.checkBody('password','Mật khẩu không đúng').notEmpty().isLength({min: 8});
        var errors = req.validationErrors();
        if(errors) {
          var messages = [];
          errors.forEach((error) => {
            messages.push(error.msg);
          });
          return done(null, false, req.flash('error', messages));
        }  
        User.findOne({ Email: Email } , (err, user) => {
            console.log(user.validPassword(Password));

            if (err) { return done(err); } 
            if (!user) {
                return done(null, false, { message: 'Rất tiếc! Tài khoản không tồn tại' });
            }
            if (!user.validPassword(Password)) {
                return done(null, false, { message: 'Sai password.' });
            }
            
            return done(null, user);
        });
    }));


     //login-admin
     passport.use('login-admin', new LocalStrategy({
        usernameField: 'mail',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, Email, Password, done) {    
        User.findOne({ Email: Email }, (err, user) => {
            console.log(user.validPassword(Password));
            
            if (err) { return done(err); } 
            if (!user) {
                return done(null, false, { message: 'Rất tiếc! Tài khoản không tồn tại' });
            }
            if (!user.validPassword(Password)) {
                return done(null, false, { message: 'Sai password.' });
            }
            return done(null, user);
        });
    }));
//singup
passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        req.checkBody('username', 'Họ tên không được trống (Tối thiểu 1 ký tự, tối đa 20 ký tự).').notEmpty().isLength({ min: 1, max: 20 }).trim();
        req.checkBody('email', 'Email không đúng').notEmpty().isEmail().trim();
        req.checkBody('password', "Pass không đúng").notEmpty().isLength({ min: 8 }).equals(req.body.confirm); 
        var error = req.validationErrors();
        if(error) {
            var message = [];
            for(var er in  error) {
                message.push(error[er]);
            }
            return done(null,false,req.flash('err', message));
        }
        User.findOne({ 'email': email }, function (err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, req.flash('signupMessage', 'Email  đã tồn tại .'));
            } else {
                var newUser = new User();
                newUser.Fullname = req.body.name;
                newUser.Username = req.body.username;                
                newUser.Address = req.body.address;
                newUser.Phone = req.body.phone;
                newUser.Email = req.body.email; 
                newUser.Password = newUser.encryptPassword(password);
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));