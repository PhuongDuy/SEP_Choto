var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserStatusSchema = new mongoose.Schema({
    ID: {
        type: String,
    },
    StatusName: {
        type: String,
    },
    Status: {
        type: String,
    }
});
module.exports = mongoose.model('UserStatus', UserStatusSchema); 