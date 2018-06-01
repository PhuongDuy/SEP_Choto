var Post = require("../models/Post"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://DuyHo:hothanhphuongduy@ds149479.mlab.com:49479/sep_team5');

var post = [
    new Post({
        ProductName: "Iphone 6S - 64GB",
        Discription: "Điện thoại chính hãng, bảo hành 2 năm, full box, new 99,99%",
        Price: 6500000,
        User_ID: "5afc829935ac1b9a88a28995",
        ProductType_ID: "PT01",
        Create_at: "2018-04-17T17:00:00.000Z",
        PostStatus_ID: "PS01",
        Image: "car.jpg,18.jpg,17.jpg"
    }),
    new Post({
        PostStatus_ID : "PS02",
        Create_at : ("2018-05-29T20:19:50.292Z"),
        ProductType_ID : "PT04",
        ProductName : "Sách dạy nấu ăn 121",
        User_ID : "5afc829935ac1b9a88a28995",
        Price : 500001,
        Image : "files-1527708765819.jpg",
        Discription : "sách dạy nấu ăn cho nhà hàng 5 sao 1"
    }),
    new Post({
        PostStatus_ID : "PS02",
        Create_at : ("2018-05-30T10:49:04.258Z"),
        ProductType_ID : "PT10",
        ProductName : "Dâu đà lạt ",
        User_ID : "5afc829935ac1b9a88a28995",
        Price : 80000,
        Image : "files-1527678625354.jpg,files-1527678625355.jpg",
        Discription : "dâu tươi"
    }),
    new Post({
        ProductName: "Iphone 6Plus - 64GB",
        Discription: "Điện thoại chính hãng, bảo hành 2 năm, full box, new 99,99%",
        Price: 7000000,
        User_ID: "5afc829935ac1b9a88a28995",
        ProductType_ID: "PT01",
        Create_at: "2018-04-17T17:00:00.000Z",
        PostStatus_ID: "PS02",
        Image: "flower.jpg,14.jpg"
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