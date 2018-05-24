var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductTypeSchema = new mongoose.Schema({
    ID: {
        type: String,
    },
    TypeName: {
        type: String,
    },
    Name:{
        type: String
    },
    Detail:{
        type: String
    },
    Image:{
        type: String
    },
    Status: {
        type: String,
    }
});
module.exports = mongoose.model('ProductType', ProductTypeSchema); 