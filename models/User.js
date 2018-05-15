'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    ID: {
        type: String,
        unique: true,
        required: true
    },
    FullName: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String,
    },
    Phone: {
        type: String
    },
    Address: {
        type: String
    },
    Birthday: {
        type: Date
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
        enum: ["USO1","US02"],
        default: "US02"
    }
});



module.exports = mongoose.model('User', UserSchema); 