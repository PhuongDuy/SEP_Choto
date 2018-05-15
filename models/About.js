var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutSchema = new mongoose.Schema({
    ID: {
        type: String,
        unique: true,
        required: true
    },
    Title: {
        type: String,
    },
    Content: {
        type: String,
    }
});
module.exports = mongoose.model('About', AboutSchema); 