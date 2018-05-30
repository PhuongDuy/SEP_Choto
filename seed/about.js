var About = require("../models/About"),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SEPK21T1');

var about = [
    new About({
        Title: "Chợ Tốt Văn Lang luôn đặt sự an toàn của người dùng lên hàng đầu",
        Content: "Xây dựng Quy trình Kiểm duyệt tin với đội ngũ hơn 100 kiểm duyệt viên.Phát triển tính năng sản phẩm nhằm bảo vệ thông tin người dùng.Hỗ trợ người dùng tức thời thông qua kênh Chăm sóc Khách hàng."
    }),
    new About({
        Title: "Chính sách bảo trì, bảo hành",
        Content: "Khi tiến hành giao dịch người mua cần trao đổi về chính sách bảo hành hàng hóa của người bán (nếu có). Đồng thời yêu cầu người bán cung cấp giấy bảo hành hàng hóa (nếu có).Người bán có trách nhiệm tiếp nhận bảo hành sản phẩm dịch vụ cho người mua như trong cam kết giấy bảo hành sản phẩm.Người mua luôn giữ giấy bảo hành và có quyền đến tận nơi cung cấp sản phẩm để bảo hành hoặc yêu cầu đến tận nhà bảo trì đối với sản phẩm cố định sử dụng tại nhà."
    }),
    new About({
        Title: "Mục tiêu của Chợ Tốt",
        Content: "Mục tiêu của Chợ Tốt là sẽ trở thành thị trường mua bán trực tuyến hàng đầu Việt Nam. Mục đích của trang web là cho phép người mua và người bán kết nối và giao dịch an toàn, dễ dàng trong một môi trường tiện lợi và rõ ràng."
    })
]

var done = 0;
for (var i = 0; i < about.length; i++) {
    about[i].save((err, result) => {
        done++;
        if (done == about.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}