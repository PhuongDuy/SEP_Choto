var PostStatus = require("../models/PostStatus"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://DuyHo:hothanhphuongduy@ds149479.mlab.com:49479/sep_team5');

var poststatus = [
    new PostStatus ({
        ID : "PS01",
        StatusName : "Hiển thị",
        Status : "true"
    }),
    new PostStatus ({
        ID : "PS02",
        StatusName : "Ẩn",
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