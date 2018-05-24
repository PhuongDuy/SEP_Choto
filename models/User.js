'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    Fullname: {
        type: String
    },
    Email: {
        type: String,
        trim: true
    },
    Password: {
        type: String,
        trim: true
    },
    Phone: {
        type: String,
        trim: true
    },
    Address: {
        type: String
    },
    Role: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    Created_at: {
        type: Date,
        default: Date.now
    },
    Update_at: {
        type: Date,
        default: Date.now
    },
    Status_ID: {
        type: String,
        default: "US02"
    },
    Username: {
        type: String,
        trim: true
    }
});


UserSchema.methods.encryptPassword = function(password,err,done) {
    if(err) { return done("Lỗi mã hoá mật khẩu" + err); }
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
  
UserSchema.methods.validPassword = function(Password) {
      if(this.Password != null) {
        return bcrypt.compareSync(Password, this.Password);
      } else {
          return false;
      }
  };

module.exports = mongoose.model('User', UserSchema); 