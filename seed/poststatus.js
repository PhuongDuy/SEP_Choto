var PostStatus = require("../models/PostStatus"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SEPK21T1');

var poststatus = [
    new PostStatus ({
        ID : "PSO1",
        StatusName : "Đã duyệt",
        Status : "true"
    }),
    new PostStatus ({
        ID : "PSO2",
        StatusName : "Chưa duyệt",
        Status : "true"
    })
]

var done = 0;
for(var i = 0; i < poststatus.length; i++){
    poststatus[i].save((err, result) => {
        done++;
        if(done == poststatus.length)
        {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}