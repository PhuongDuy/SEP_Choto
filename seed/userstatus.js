var UserStatus = require("../models/UserStatus"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://DuyHo:hothanhphuongduy@ds149479.mlab.com:49479/sep_team5');

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