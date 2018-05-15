var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'),
  bodyParser = require('body-parser'),
  urlencodedParser = bodyParser.urlencoded({ extended: false }),
  MongoClient = require('mongodb').MongoClient,
  objectId = require('mongodb').ObjectID,
  assert = require('assert'),
  User = require('../models/User'),
  About = require('../models/About'),
  Post = require('../models/Post'),
  PostStatus = require('../models/PostStatus'),
  ProductType = require('../models/ProductType'),
  UserStatus = require('../models/UserStatus'),
  multer = require('multer'),
  mongoose = require('mongoose');

/* GET home page. */

//luuhinh
var storage = multer.diskStorage({
  destination: function(req, file, cd){
    cd(null, './public/frontend/images')
  },
  filename: function(req, file, cd){
    cd(null, file.originalname)
  }
});




//frontend

router.get('/', function (req, res, next) {
  ProductType.find(function (err, docs) {
    if (err) throw console.log(err);
    res.render('index', { ty: docs });
  });
});

router.get('/about', function (req, res, next) {
  res.render('about');
});

router.get('/viewlistproject/:id', function (req, res, next) {
  ProductType.find(function (err, dos) {
    ProductType.findById(req.params.id, function (err, docs) {
      if (err) throw console.log(err);
      Post.find({ ProductType_ID: docs.ID }, function (err, type) {
        if (err) throw console.log(err);
        res.render('viewlistproject', { data: type, ty: dos })
      });
    });
  });
});

router.post('/edit-san-pham', function (req, res, next) {
  res.render('about');
});


router.get('/contact', function (req, res, next) {
  res.render('contact');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/mail', function (req, res, next) {
  res.render('mail');
});



router.get('/post-product', function (req, res, next) {
  let loai = [];
  ProductType.find((er,tr) => {
    for (let index in tr) {
       loai.push(tr[index]);
    }
  });
  res.render('post-product',{
    loai: loai
  });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/viewdetail/:id', function (req, res) {
  Post.findById(req.params.id, function (err, docs) {
      var str = docs.Image.split(',');
      if (err) throw console.log(err);
      User.findOne({ ID: docs.User_ID }, function (err, us) {
          if (err) throw console.log(err);
          res.render('viewdetail', { lipost: docs, seller: us, img: str });
      });
  });
});

router.get('/postofuser', function (req, res, next) {
  Post.find(function (err, docs) {
    if (err) throw console.log(err);
    docs.forEach(element => {
        ProductType.findOne({ ID: element.ProductType_ID }, function (err, result) {
            if (err) throw console.log(err);
            res.render('postofuser', { listpost: docs, tpy: result.TypeName });
        });
    });
});
});

router.get('/updateproduct', function (req, res, next) {
  Post.findById(req.params.id, function (err, docs) {
    var str = docs.Image.split(',');
    if (err) throw console.log(err);
    res.render('updateproduct', { lipost: docs, img: str });
});
});

router.post('/mail', urlencodedParser, function (req, res) {

  var yourname = req.body.yourname;
  var youremail = req.body.youremail;
  var numphone = req.body.numphone;
  var message = req.body.message;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ppcrentalteam04@gmail.com',
      pass: 'K21t1team04'
    }
  });

  var mailOptions = {
    from: '"Hỗ trợ chợ tốt Văn Lang"<ppcrentalteam04@gmail.com>',
    to: 'team05.sep.2018@gmail.com',
    //pass:sep.team05.2018
    subject: 'Hỗ trợ khách hàng',
    text: 'Họ và tên: ' + yourname + ' Địa chỉ email: ' + youremail + ' Số điện thoại: ' + numphone + ' Nội dung:' + message
  };

  transporter.sendMail(mailOptions, function (err, inffo) {
    if (err) {
      console.log(err);
      res.send('Thất bại');
    } else {
      res.send('Bạn đã gửi liên hệ thành công ')
    }
  })
});

//backend
router.get('/ListOfPost', function (req, res, next) {
  Post.find(function (err, docs) {
    if (err) throw console.log(err);
    docs.forEach(element => {
      PostStatus.findOne({ ID: element.PostStatus_ID }, function (err, stu) {
        if (err) throw console.log(err);
        ProductType.findOne({ ID: element.ProductType_ID }, function (err, result) {
          if (err) throw console.log(err);
          console.log(stu.StatusName);
          res.render('ListOfPost', { listpost: docs, stut: stu.StatusName, tpy: result.TypeName });
        });
      });
    });
  });
});

router.get('/ViewDetailOSP/:id', function (req, res) {
  Post.findById(req.params.id, function (err, docs) {
    var str = docs.Image.split(',');
    if (err) throw console.log(err);
    User.findOne({ ID: docs.User_ID }, function (err, us) {
      if (err) throw console.log(err);
      res.render('ViewDetailOSP', { lipost: docs, seller: us, img: str });
    });
  });
});

router.get("/ListOfUser", function (req, res) {
  UserStatus.findOne({ ID: "US01" }, function (err, statu) {
    if (err) throw console.log(err);
    User.find({ Status_ID: statu.ID }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('ListOfUser', { listuser: docs, asa: statu.StatusName });
    });
  });
})

router.get("/approveuser", function (req, res) {
  UserStatus.findOne({ ID: "US02" }, function (err, statu) {
    if (err) throw console.log(err);
    User.find({ Status_ID: statu.ID }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('approveuser', { listuser: docs, asa: statu.StatusName });
    });
  });
});

router.get("/updateproduct/:id", function (req, res) {
  Post.findById(req.params.id, function (err, docs) {
    var str = docs.Image.split(',');
    if (err) throw console.log(err);
    res.render('updateproduct', { lipost: docs, img: str });
  });
});



router.put("/thay-doi-trang-thai/:id", function (req, res, next) {
  let query = { _id: req.params.id };
  User.update(query, { Status_ID: req.body.valStatus }, function (err, result) {
    if (err) { return console.log('err'); }
    else { res.json(result); }
  });
});

router.put("/post-status-change/:id", function (req, res, next) {
  let query = { _id: req.params.id };
  Post.update(query, { PostStatus_ID: req.body.valStatus }, function (err, result) {
    if (err) { return console.log('err'); }
    else { res.json(result); }
  });
});

router.get('/viewapproveuser/:id', function (req, res) {
  UserStatus.findOne({ ID: "US02" }, function (err, statu) {
    if (err) throw console.log(err);
    User.findOne({ Status_ID: statu.ID }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('viewapproveuser', { seller: docs, asa: statu.StatusName });
    });
  });
});

module.exports = router;
