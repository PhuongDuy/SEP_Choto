var Post = require("../models/Post"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SEPK21T1');

var post = [
    new Post({
        ProductName: "Iphone 6S - 64GB",
        Discription: "Điện thoại chính hãng, bảo hành 2 năm, full box, new 99,99%",
        Price: 6500000,
        User_ID: "Se01",
        ProductType_ID: "PT01",
        Create_at: "2018-04-17T17:00:00.000Z",
        PostStatus_ID: "PS01",
        Image: "car.jpg,18.jpg,17.jpg",
        Avatar: "13.jpg"
    }),
    new Post({
        ProductName: "Iphone 6Plus - 64GB",
        Discription: "Điện thoại chính hãng, bảo hành 2 năm, full box, new 99,99%",
        Price: 7000000,
        User_ID: "Se01",
        ProductType_ID: "PT01",
        Create_at: "2018-04-17T17:00:00.000Z",
        PostStatus_ID: "PS02",
        Image: "flower.jpg,14.jpg",
        Avatar: "flower.jpg"
    })
];

var done = 0;
for (var i in post) {
    post[i].save((err, result) => {
        done++;
        if (done == post.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}