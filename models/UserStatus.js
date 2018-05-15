var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserStatusSchema = new mongoose.Schema({
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
module.exports = mongoose.model('UserStatus', UserStatusSchema); 