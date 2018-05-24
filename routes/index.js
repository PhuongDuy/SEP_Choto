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
var passport = require('passport');

/* GET home page. */

//luuhinh
var storage = multer.diskStorage({
  destination: 'public/frontend/images',
  filename: function (req, file, cd) {
    cd(null, file.originalname);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Vui lòng chỉ chọn hình ảnh!'), false);
  }
  cb(null, true);
}


//frontend

router.get('/', function (req, res, next) {
  ProductType.find(function (err, docs) {
    if (err) throw console.log(err);
    res.render('index', { ty: docs, user: req.user});
  });
});

router.get('/about', function (req, res, next) {
  res.render('about', { user: req.user });
});


router.get('/viewlistproject/:id', function (req, res, next) {
  ProductType.find(function (err, dos) {
    ProductType.findById(req.params.id, function (err, type) {
      if (err) throw console.log(err);
      Post.find({ ProductType_ID: type.ID }, function (err, docs) {
        console.log(docs);
        if (err) throw console.log(err);
        res.render('viewlistproject', { data: docs, ty: dos, user: req.user })
      });
    });
  });
});


router.get('/contact', function (req, res, next) {
  res.render('contact', { user: req.user });
});



router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('login', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    let currentUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(currentUrl);
  } else
    if(req.user.Status_ID == 'US01') {
    res.redirect('/');
    }
    res.redirect('/messapprove');
});

router.get('/mail', function (req, res, next) {
  res.render('mail');
});

router.get('/messapprove', section, function (req, res, next) {
  res.render('messapprove', { title: 'Chờ duyệt', user: req.user });
});

router.get('/post-product', section, function (req, res, next) {
  let loai = [];
  ProductType.find((er, tr) => {
    for (let index in tr) {
      loai.push(tr[index]);
    }
    res.render('post-product', {
      loai: loai,
      user: req.user
    });
  });
});

router.post('/post-product', section, upload.single("fileavatar"), function (req, res, next) {
  var add_post = new Post();
  add_post.ProductType_ID = req.body.Product_Type;
  add_post.ProductName = req.body.title;
  add_post.User_ID = req.user._id;
  add_post.Avatar = req.body.fileavatar;
  add_post.Price = req.body.price;
  add_post.Image = req.body.fileimage;
  add_post.Discription = req.body.description;
  console.log(add_post);
  add_post.save(function (err) {
    console.log(err);
    if (err) {
      return new Error(err + "");
    } else {
      res.redirect('/');
    }
  });
});

router.get('/register', function (req, res) {
  var messages = req.flash('err');
  res.render('register', {
    messages: messages,
    hasError: messages.length > 0,
    user: req.user
  });
});

router.post('/register', passport.authenticate('register', {
  failureRedirect: '/register',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    let currentUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(currentUrl);
  } else {
    res.redirect('/messapprove');
  }
});

router.get('/viewdetail/:id', urlencodedParser, function (req, res) {
  Post.findById(req.params.id, function (err, docs) {
    var str = docs.Image.split(',');
    if (err) throw console.log(err);
    User.findOne({ _id: docs.User_ID }, function (err, us) {
      if (err) throw console.log(err);
      res.render('viewdetail', { lipost: docs, seller: us, img: str, user: req.user });
    });
  });
});

router.post('/sendmailseller', urlencodedParser, function (req, res) {
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
    to: req.User.Email,
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

router.get('/postofuser', section, function (req, res, next) {
  Post.find(function (err, docs) {
    if (err) throw console.log(err);
    docs.forEach(element => {
      ProductType.findOne({ ID: element.ProductType_ID }, function (err, result) {
        if (err) throw console.log(err);
        res.render('postofuser', { listpost: docs, tpy: result.TypeName, user: req.user });
      });
    });
  });
});

router.get('/updateproduct', section, function (req, res) {
  Post.findById(req.params.id, function (err, docs) {
    var str = docs.Image.split(',');
    if (err) throw console.log(err);
    res.render('updateproduct', { lipost: docs, img: str, user: req.user });
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
router.get('/ListOfPost',sectionadmin, function (req, res) {
  Post.find(function (err, docs) {
    if (err) throw console.log(err);
    res.render('ListOfPost', { listpost: docs,user: req.user });
  });
});

router.get('/ViewDetailOSP/:id',sectionadmin, function (req, res, next) {
  Post.findById(req.params.id, function (err, docs) {
    var str = docs.Image.split(',');
    if (err) throw console.log(err);
    User.findOne({ _id: docs.User_ID }, function (err, us) {
      if (err) throw console.log(err);
      res.render('ViewDetailOSP', { lipost: docs, seller: us, img: str,user: req.user });
    });
  });
});

router.get("/ListOfUser",sectionadmin, function (req, res) {
  UserStatus.findOne({ ID: "US01" }, function (err, statu) {
    if (err) throw console.log(err);
    User.find({ Status_ID: statu.ID }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('ListOfUser', { listuser: docs, asa: statu.StatusName,user: req.user });
    });
  });
})

router.get("/approveuser",sectionadmin, function (req, res) {
  UserStatus.findOne({ ID: "US02" }, function (err, statu) {
    if (err) throw console.log(err);
    User.find({ Status_ID: statu.ID }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('approveuser', { listuser: docs, asa: statu.StatusName,user: req.user });
    });
  });
});

router.get("/updateproduct/:id",sectionadmin, function (req, res) {
  Post.findById(req.params.id, function (err, docs) {
    var str = docs.Image.split(',');
    if (err) throw console.log(err);
    res.render('updateproduct', { lipost: docs, img: str,user: req.user });
  });
});

router.get('/login-admin', function (req, res, next) {
  res.render('login-admin');
});

router.post('/login-admin', passport.authenticate('login-admin', {
  failureRedirect: '/login-admin',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    let currentUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(currentUrl);
  } else
    if(req.user.Role === 1) {
    res.redirect('/ListOfUser');
    }
    res.redirect('/messapprove');
});

router.put("/thay-doi-trang-thai/:id",sectionadmin, function (req, res, next) {
  let query = { _id: req.params.id };
  User.update(query, { Status_ID: req.body.valStatus }, function (err, result) {
    if (err) { return console.log('err'); }
    else { res.json(result); }
  });
});

router.put("/post-status-change/:id",sectionadmin, function (req, res, next) {
  let query = { _id: req.params.id };
  Post.update(query, { PostStatus_ID: req.body.valStatus }, function (err, result) {
    if (err) { return console.log('err'); }
    else { res.json(result); }
  });
});

router.get('/viewapproveuser/:id',sectionadmin, function (req, res, next) {
  UserStatus.findOne({ ID: "US02" }, function (err, statu) {
    if (err) throw console.log(err);
    User.findOne({ Status_ID: statu.ID }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('viewapproveuser', { seller: docs, asa: statu.StatusName,user: req.user });
    });
  });
});

function section(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.originalUrl;
  res.redirect('/login');
}

function sectionadmin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.originalUrl;
  res.redirect('/login-admin');
}

router.get('/logout', section, function (req, res, next) {
  req.logout();
  res.redirect('/');
});

function isPay(req, res, next) {
  if (req,user.Role === '0') {
    if (req.user.Status === 'US01') {
      return next();
    }
  }
  res.redirect('/messapprove');
}

module.exports = router;
