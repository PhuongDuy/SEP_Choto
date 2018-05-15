var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostStatusSchema = new mongoose.Schema({
    ID: {
        type: String,
        unique: true,
        required: true
    },
    StatusName: {
        type: String,
    },
    Status: {
        type: String,
    }
});
module.exports = mongoose.model('PostStatus', PostStatusSchema); 