var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutSchema = new mongoose.Schema({
    ID: {
        type: String,
    },
    Title: {
        type: String,
    },
    Content: {
        type: String,
    }
});
module.exports = mongoose.model('About', AboutSchema); 