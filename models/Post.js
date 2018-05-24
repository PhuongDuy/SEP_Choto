'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
    ProductName: {
        type: String,
    },
    Discription: {
        type: String
    },
    Price: {
        type: Number,
    },
    User_ID: {
        type: String
    },
    ProductType_ID: {
        type: String,
    },
    Create_at: {
        type: Date,
        default: Date.now

    },
    PostStatus_ID: {
        type: String,
        default: "PS01"
    },
    Image: {
        type: String
    },
    Avatar:{
        type: String
    }
});
module.exports = mongoose.model('Post', PostSchema); 