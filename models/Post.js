'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
    ID: {
        type: String,
        unique: true,
        required: true,

    },
    ProductName: {
        type: String,
    },
    Discription: {
        type: String,

    },
    Price: {
        type: Number,

    },
    User_ID: {
        type: String,
        required: true
    },
    ProductType_ID: {
        type: String,
        enum: ["PTO1","PT02","PTO3","PT04","PTO5","PT06","PTO7","PT08","PTO9","PT10","PT11","PT12","PT13","PT14"]
    },
    Create_at: {
        type: Date,
        default: Date.now

    },
    PostStatus_ID: {
        type: String,
        required: true
    },
    Image: {
        type: String
    },
    Avatar:{
        type: String
    }
});
module.exports = mongoose.model('Post', PostSchema); 