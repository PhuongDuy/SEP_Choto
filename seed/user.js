var User = require("../models/User"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SEPK21T1');

var user = [
        new User({
            FullName : "Lý Thị Huyền Châu",
            Email : "chauly.sep.2018@gmail.com",
            Password : "sep.2018",
            Phone : "0123456789",
            Address : "45 Nguyễn Khắc Nhu, Quận 1, Tp Hồ Chí Minh",
            Brithday : "2000-10-25",
            Role : "1",
            Status_ID : "US01",
            Created_at : "2018-4-17",
            Update_at : "2018-4-17"
        }),
        new User({
            FullName : "Hồ Thanh Phương Duy",
            Email : "duyho9@vanlanguni.vn",
            Password : "123456",
            Phone : "0987654321",
            Address : "363F Phan Văn Trị, Phường 11, Quận Bình Thạnh, Tp Hồ Chí Minh",
            Brithday : "1997-1-21",
            Role : "0",
            Status_ID : "US01",
            Created_at : "2018-4-17",
            Update_at : "2018-4-17"
        }),
        new User({
            FullName : "Phạm Đăng Khoa",
            Email : "phamdangkhoa0403@gmail.com",
            Password : "123456",
            Phone : "0741258963",
            Address : "363F Phan Văn Trị, Phường 11, Quận Bình Thạnh, Tp Hồ Chí Minh",
            Brithday : "1997-5-5",
            Role : "0",
            Status_ID : "US01",
            Created_at : "2018-4-17",
            Update_at : "2018-4-17"
        }),
        new User({
            FullName : "Nguyễn Tấn Ninh",
            Email : "nguyentanninh123@gmail.com",
            Password : "123456",
            Phone : "0987654231",
            Address : "363F Phan Văn Trị, Phường 11, Quận Bình Thạnh, Tp Hồ Chí Minh",
            Brithday : "1997-5-21",
            Role : "0",
            Status_ID : "US02",
            Created_at : "2018-4-17",
            Update_at : "2018-4-17"
        })
];

var done = 0;
for(var i = 0; i < user.length; i++){
    user[i].save((err, result) => {
        done++;
        if(done == user.length)
        {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}