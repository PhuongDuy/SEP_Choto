var UserStatus = require("../models/UserStatus"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SEPK21T1');

var userstatus = [
    new UserStatus ({
        ID : "US01",
        StatusName : "Đã duyệt",
        Status : "true"
    }),
    new UserStatus ({
        ID : "US02",
        StatusName : "Chưa duyệt",
        Status : "true"
    })
]

var done = 0;
for(var i = 0; i < userstatus.length; i++){
    userstatus[i].save((err, result) => {
        done++;
        if(done == userstatus.length)
        {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}