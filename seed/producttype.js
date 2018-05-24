var ProductType = require("../models/ProductType"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SEPK21T1');

var producttype = [
    new ProductType({
        TypeName: "Điện thoại & máy tính bảng",
        Status: "true",
        Name: "Mobile & Tablet",
        Detail: "Sản phẩm điện thoại",
        Image: "1.jpg"

    }),
    new ProductType({
        TypeName: "Máy tính",
        Status: "true",
        Name: "Laptop",
        Detail: "Sản phẩm máy tính",
        Image: "2.jpg"

    }),
    new ProductType({
        TypeName: "Máy ảnh",
        Status: "true",
        Name: "Camera",
        Detail: "Sản phẩm máy ảnh",
        Image: "3.jpg"

    }),
    new ProductType({
        TypeName: "Sách",
        Status: "true",
        Name: "Book",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "12.jpg"

    }),
    new ProductType({
        TypeName: "Tivi",
        Status: "true",
        Name: "Television",
        Detail: "Sản phẩm tivi",
        Image: "7.jpg"
    }),
    new ProductType({
        TypeName: "Xe máy",
        Status: "true",
        Name: "Moto Bike",
        Detail: "Mua bán xe máy",
        Image: "4.jpg"
    }),
    new ProductType({
        TypeName: "Điện lạnh",
        Status: "true",
        Name: "Air Conditioner",
        Detail: "Đồ dùng điện lạnh",
        Image: "8.jpg"

    }),
    new ProductType({
        TypeName: "Thực phẩm",
        Status: "true",
        Name: "Food & Vegetable",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "6.jpg"

    }),
    new ProductType({
        TypeName: "Thời trang",
        Status: "true",
        Name: "Fashion",
        Detail: "Project for Thonik, design studio based in Amsterdam",
        Image: "5.jpg"

    }),
    new ProductType({
        TypeName: "Thiết bị âm thanh",
        Status: "true",
        Name: "Sound Devices",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "9.jpg"

    }),
    new ProductType({
        TypeName: "Mỹ Phẩm & Làm Đẹp",
        Status: "true",
        Name: "Cosmetic & Beauty",
        Detail: "Galerie Anatome based in Paris",
        Image: "10.jpg"

    }),
    new ProductType({
        TypeName: "Phiếu giảm giá",
        Status: "true",
        Name: "Voucher",
        Detail: "Project for Thonik, design studio based in Amsterdam",
        Image: "13.jpg"

    }),
    new ProductType({
        TypeName: "Đồ chơi trẻ em",
        Status: "true",
        Name: "Toy",
        Detail: "Over 40,000 customers use our themes to power their",
        Image: "11.jpg"

    }),
    new ProductType({
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