var ProductType = require("../models/ProductType"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://DuyHo:hothanhphuongduy@ds149479.mlab.com:49479/sep_team5');

var producttype = [
    new ProductType({
        ID: "PT01",
        TypeName: "Điện thoại & máy tính bảng",
        Status: "true",
        Name: "Mobile & Tablet",
        Detail: "Sản phẩm điện thoại",
        Image: "1.jpg"

    }),
    new ProductType({
        ID: "PT02",
        TypeName: "Máy tính",
        Status: "true",
        Name: "Laptop",
        Detail: "Sản phẩm máy tính",
        Image: "2.jpg"

    }),
    new ProductType({
        ID: "PT03",
        TypeName: "Máy ảnh",
        Status: "true",
        Name: "Camera",
        Detail: "Sản phẩm máy ảnh",
        Image: "3.jpg"

    }),
    new ProductType({
        ID: "PT04",
        TypeName: "Sách",
        Status: "true",
        Name: "Book",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "12.jpg"

    }),
    new ProductType({
        ID: "PT05",
        TypeName: "Tivi",
        Status: "true",
        Name: "Television",
        Detail: "Sản phẩm tivi",
        Image: "7.jpg"
    }),
    new ProductType({
        ID: "PT06",
        TypeName: "Xe máy",
        Status: "true",
        Name: "Moto Bike",
        Detail: "Mua bán xe máy",
        Image: "4.jpg"
    }),
    new ProductType({
        ID: "PT07",
        TypeName: "Điện lạnh",
        Status: "true",
        Name: "Air Conditioner",
        Detail: "Đồ dùng điện lạnh",
        Image: "8.jpg"

    }),
    new ProductType({
        ID: "PT08",
        TypeName: "Thực phẩm",
        Status: "true",
        Name: "Food & Vegetable",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "6.jpg"

    }),
    new ProductType({
        ID: "PT09",
        TypeName: "Thời trang",
        Status: "true",
        Name: "Fashion",
        Detail: "Project for Thonik, design studio based in Amsterdam",
        Image: "5.jpg"

    }),
    new ProductType({
        ID: "PT10",
        TypeName: "Thiết bị âm thanh",
        Status: "true",
        Name: "Sound Devices",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "9.jpg"

    }),
    new ProductType({
        ID: "PT11",
        TypeName: "Mỹ Phẩm & Làm Đẹp",
        Status: "true",
        Name: "Cosmetic & Beauty",
        Detail: "Galerie Anatome based in Paris",
        Image: "10.jpg"

    }),
    new ProductType({
        ID: "PT12",
        TypeName: "Phiếu giảm giá",
        Status: "true",
        Name: "Voucher",
        Detail: "Project for Thonik, design studio based in Amsterdam",
        Image: "13.jpg"

    }),
    new ProductType({
        ID: "PT13",
        TypeName: "Đồ chơi trẻ em",
        Status: "true",
        Name: "Toy",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "11.jpg"

    }),
    new ProductType({
        ID: "PT14",
        TypeName: "Nội thất",
        Status: "true",
        Name: "Furniture",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "15.jpg"
    })

]

var done = 0;
for (var i = 0; i < producttype.length; i++) {
    producttype[i].save((err, result) => {
        done++;
        if (done == producttype.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}