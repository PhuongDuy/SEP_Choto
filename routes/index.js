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
  path = require('path'),
  mongoose = require('mongoose');
var passport = require('passport');

/* GET home page. */

//luuhinh
var maxImg = [];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/frontend/images')
  },
  filename: function (req, file, cb) {
    var imgArr = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    if ((maxImg.length) > 9) {
      return cb('Hình quá số lượng cho phép');
    }
    else {
      maxImg.push(imgArr);
      cb(null, imgArr);
    }
  }
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 8,
  },
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
    res.render('index', { ty: docs, user: req.user, sp: docs });
  });
});

router.get('/about', function (req, res, next) {
  ProductType.find(function (err, sp) {
    About.find(function (err, docs) {
      if (err) throw console.log(err);
      res.render('about', { user: req.user, about: docs, sp: sp });
    })
  });
});


router.get('/viewlistproject/:id', function (req, res, next) {
  ProductType.find(function (err, dos) {
    ProductType.findById(req.params.id, function (err, type) {
      if (err) throw console.log(err);
      Post.find({ $and: [{ ProductType_ID: type.ID }, { PostStatus_ID: "PS01" }] }, function (err, docs) {
        docs.map(r => {
          let position = r.Image.indexOf(',');
          if (r.Image.length !== position) {
            r['Image'] = r.Image.split(",", 1);
          } else {
            r['Image'] = r.Image;
          }
          return r;
        });
        if (err) throw console.log(err);
        res.render('viewlistproject', { data: docs, ty: type, user: req.user, sp: dos })
      });
    });
  });
});


router.get('/contact', function (req, res, next) {
  ProductType.find(function (err, docs) {
    res.render('contact', { user: req.user, sp: docs });
  });
});



router.get('/login', function (req, res, next) {
  var messages = req.flash('error');
  ProductType.find(function (err, docs) {
    res.render('login', { 
      user: req.user,
      sp: docs,
      messages: messages,
      hasErrors: messages.length > 0 });
  });
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
    if (req.user.Status_ID == 'US01') {
      res.redirect('/postofuser');
    }
  res.redirect('/messapprove');
});


router.get('/messapprove', section, function (req, res, next) {
  ProductType.find(function (err, docs) {
    res.render('messapprove', { title: 'Chờ duyệt', user: req.user, sp: docs });
  });
});

router.get('/post-product', section, function (req, res, next) {
  let loai = [];
  ProductType.find((er, tr) => {
    for (let index in tr) {
      loai.push(tr[index]);
    }
    res.render('post-product', {
      loai: loai,
      user: req.user,
      sp: loai
    });
  });
});

router.post('/post-product', section, function (req, res, next) {
  upload.array("files")(req, res, function (err) {
    if (err) {
      let loai = [];
      ProductType.find((er, tr) => {
        for (let index in tr) {
          loai.push(tr[index]);
        }
        res.render('post-product', {
          msg: "Lỗi: Số lượng hình ảnh vượt quá 8 ảnh!",
          loai: loai,
          user: req.user,
          sp: loai
        });
      });
    } else {
      let img = req.files.map(r => r.filename);
      if (img.length === 0) {
        var add_post = new Post();
        add_post.ProductType_ID = req.body.Product_Type;
        add_post.ProductName = req.body.title;
        add_post.Unit = req.body.Unit;
        add_post.Quantity = req.body.quantity;
        add_post.User_ID = req.user._id;
        add_post.Price = req.body.price;
        add_post.Image = "main.jpg";
        add_post.Discription = req.body.description;
        add_post.save(function (err) {
          if (err) {
            return console.log(err);
          } else {
            return res.redirect('/');
          }
        });
      } else {
        if (img.length < 9) {
          var add_post = new Post();
          add_post.ProductType_ID = req.body.Product_Type;
          add_post.ProductName = req.body.title;
          add_post.Unit = req.body.Unit;
          add_post.Quantity = req.body.quantity;
          add_post.User_ID = req.user._id;
          add_post.Price = req.body.price;
          add_post.Image = img.toString();
          add_post.Discription = req.body.description;
          add_post.save(function (err) {
            if (err) {
              return console.log(err);
            } else {
              return res.redirect('/');
            }
          });
        } else {
          let loai = [];
          ProductType.find((er, tr) => {
            for (let index in tr) {
              loai.push(tr[index]);
            }
            res.render('post-product', {
              msg: "Lỗi: Số lượng hình ảnh vượt quá 8 ảnh!",
              loai: loai,
              user: req.user,
              sp: loai
            });
          });
        }
      }
    }
  })
});

router.get('/register', function (req, res) {
  ProductType.find(function (err, docs) {
    var messages = req.flash('err');
    res.render('register', {
      messages: messages,
      hasError: messages.length > 0,
      user: req.user,
      sp: docs
    });
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
  ProductType.find(function (err, sp) {
    Post.findById(req.params.id, function (err, docs) {
      var str = docs.Image.split(',');
      if (err) throw console.log(err);
      ProductType.findOne({ ID: docs.ProductType_ID }, function (err, type) {
        if (err) throw console.log(err);
        User.findOne({ _id: docs.User_ID }, function (err, us) {
          if (err) throw console.log(err);
          res.render('viewdetail', { lipost: docs, seller: us, img: str, user: req.user, sp: sp, type: type });
        });
      });
    });
  });
});

router.post('/viewdetail/:id', urlencodedParser, function (req, res) {
  Post.findById(req.params.id, function (err, docs) {
    if (err) throw console.log(err);
    User.findOne({ _id: docs.User_ID }, function (err, us) {
      if (err) throw console.log(err);
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
        to: us.Email,
        //pass:sep.team05.2018
        subject: 'Hỗ trợ khách hàng',
        text: 'Họ và tên: ' + yourname + ' Địa chỉ email: ' + youremail + ' Số điện thoại: ' + numphone + ' Nội dung:' + message
      };

      transporter.sendMail(mailOptions, function (err, inffo) {
        if (err) {
          console.log(err);
          res.send('Thất bại');
        } else {
          ProductType.find(function (err, sp) {
            Post.findById(req.params.id, function (err, docs) {
              var str = docs.Image.split(',');
              if (err) throw console.log(err);
              ProductType.findOne({ ID: docs.ProductType_ID }, function (err, type) {
                if (err) throw console.log(err);
                User.findOne({ _id: docs.User_ID }, function (err, us) {
                  if (err) throw console.log(err);
                  res.render('viewdetail', { lipost: docs, seller: us, img: str, user: req.user, sp: sp, type: type });
                });
              });
            });
          });
        }
      })
    });
  });
});


router.get('/postofuser', section, function (req, res, next) {
  let mang = [];
  let count = 0;
  ProductType.find(function (err, sp) {
    Post.find({ User_ID: req.user._id }, async function (err, docs) {
      if (err) throw console.log(err);
      if (docs.length !== 0) {
        for (let i in docs) {
          await ProductType.findOne({ ID: docs[i].ProductType_ID }, async function (err, result) {
            count++;
            if (err) throw console.log(err);
            await mang.push(result.TypeName);
            if (count === docs.length) {
              res.render('postofuser', { listpost: docs, tpy: mang, user: req.user, sp: sp });
              return;
            }
          });
        }
      }
      res.render('postofuser', { listpost: docs, tpy: mang, user: req.user, sp: sp });
    });
  });
});


router.get('/updateproduct/:id', section, function (req, res, next) {
  Post.findById(req.params.id, async function (err, docs) {
    if (docs.Image.length !== 0) {
      var str = docs.Image.split(',');
      if (err) throw console.log(err);
      var loai = [];
      var status = [];
      await ProductType.find(async function (err, tr) {
        if (err) throw console.log(err);
        for (let index in tr) {
          loai.push(tr[index]);
        }
        await PostStatus.find(async function (err, sta) {
          if (err) throw console.log(err);
          for (let ind in sta) {
            status.push(sta[ind]);
          }
          res.render('updateproduct', { lipost: docs, img: str, user: req.user, loai: loai, sp: loai, status: status, id: docs.ProductType_ID, idstatus: docs.PostStatus_ID });
        });
      });
    } else {
      if (err) throw console.log(err);
      var loai = [];
      var status = [];
      await ProductType.find(async function (err, tr) {
        if (err) throw console.log(err);
        for (let index in tr) {
          loai.push(tr[index]);
        }
        await PostStatus.find(async function (err, sta) {
          if (err) throw console.log(err);
          for (let ind in sta) {
            status.push(sta[ind]);
          }
          res.render('updateproduct', { lipost: docs, user: req.user, loai: loai, sp: loai, status: status, id: docs.ProductType_ID, idstatus: docs.PostStatus_ID });
        });
      });
    }
  });
});

router.post('/updateproduct/:id', section, upload.array("files", 8), function (req, res, next) {

  var edit = {};
  if (maxImg.length === 0) {
    edit.ProductType_ID = req.body.ProductType_ID;
    edit.ProductName = req.body.ProductName;
    edit.Price = req.body.Price;
    edit.Discription = req.body.Discription;
    edit.PostStatus_ID = req.body.PostStatus_ID;
    console.log(edit);
  } else {
    edit.ProductType_ID = req.body.ProductType_ID;
    edit.ProductName = req.body.ProductName;
    edit.Price = req.body.Price;
    edit.Image = maxImg.toString();
    edit.Discription = req.body.Discription;
    edit.PostStatus_ID = req.body.PostStatus_ID;
    console.log(edit);
  }
  var sp_id = { _id: req.params.id };
  Post.update(sp_id, edit, function (err) {
    if (err) {
      return console.log(err);
    } else {
      res.redirect('/postofuser');
    }
  });
});

router.post('/contact', urlencodedParser, function (req, res) {

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
      ProductType.find(function (err, docs) {
        res.render('contact', { user: req.user, sp: docs });
      });
    }
  })
});

//backend
router.get('/ListOfPost', sectionadmin, function (req, res) {
  let mang = [];
  let count = 0;
  Post.find(function (err, docs) {
    if (err) throw console.log(err);
    for (let i in docs) {
      ProductType.findOne({ ID: docs[i].ProductType_ID }, function (err, result) {
        count++;
        if (err) throw console.log(err);
        mang.push(result.TypeName);
        if (count === docs.length) {
          res.render('ListOfPost', { listpost: docs, tpy: mang, user: req.user });
        }
      });
    }
  });
});


router.get('/ViewDetailOSP/:id', sectionadmin, function (req, res, next) {
  Post.findById(req.params.id, function (err, docs) {
    var str = docs.Image.split(',');
    if (err) throw console.log(err);
    User.findOne({ _id: docs.User_ID }, async function (err, us) {
      if (err) throw console.log(err);
      var loai = [];
      var status = [];
      await ProductType.find(async function (err, tr) {
        if (err) throw console.log(err);
        for (let index in tr) {
          loai.push(tr[index]);
        }
        await PostStatus.find(async function (err, sta) {
          if (err) throw console.log(err);
          for (let ind in sta) {
            status.push(sta[ind]);
          }
          res.render('ViewDetailOSP', { lipost: docs, seller: us, img: str, user: req.user, loai: loai, status: status, id: docs.ProductType_ID, idstatus: docs.PostStatus_ID });
        });
      });
    });
  });
});

router.get("/ListOfUser", sectionadmin, function (req, res) {
  UserStatus.findOne({ ID: "US01" }, function (err, statu) {
    if (err) throw console.log(err);
    User.find({ Status_ID: statu.ID }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('ListOfUser', { listuser: docs, asa: statu.StatusName, user: req.user });
    });
  });
})

router.get("/approveuser", sectionadmin, function (req, res) {
  UserStatus.findOne({ ID: "US02" }, function (err, statu) {
    if (err) throw console.log(err);
    User.find({ Status_ID: statu.ID }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('approveuser', { listuser: docs, asa: statu.StatusName, user: req.user });
    });
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
    if (req.user.Role === 1 && req.user.Status_ID == 'US01') {
      res.redirect('/ListOfUser');
    }
  res.redirect('/messapprove');
});

router.put("/thay-doi-trang-thai/:id", sectionadmin, function (req, res, next) {
  let query = { _id: req.params.id };
  User.update(query, { Status_ID: req.body.valStatus }, function (err, result) {
    if (err) { return console.log('err'); }
    else { res.json(result); }
  });
});

router.put("/post-status-change/:id", sectionadmin, function (req, res, next) {
  let query = { _id: req.params.id };
  Post.update(query, { PostStatus_ID: req.body.valStatus }, function (err, result) {
    if (err) { return console.log('err'); }
    else { res.json(result); }
  });
});

router.get('/viewapproveuser/:id', sectionadmin, function (req, res, next) {
  UserStatus.findOne({ ID: "US02" }, function (err, statu) {
    if (err) throw console.log(err);
    User.findOne({ _id: req.params.id }, function (err, docs) {
      if (err) throw console.log(err);
      res.render('viewapproveuser', { seller: docs, asa: statu.StatusName, user: req.user });
    });
  });
});


router.get('/thongke', sectionadmin, function (req, res) {
  let mang = [];
  let count = 0;
  Post.find(function (err, docs) {
    for (let i in docs) {
      ProductType.findOne({ ID: docs[i].ProductType_ID }, async function (err, result) {
        count++;
        if (err) throw console.log(err);
        await mang.push(result.TypeName);
        if (count === docs.length) {
          let arr = [];
          mang.forEach(function (i) { arr[i] = (arr[i] || 0) + 1; });
          res.render('thongke', { listpost: docs, user: req.user, tpy: arr })
        }
      });
    }
  });
});


function section(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.originalUrl;
  return res.redirect('/login');
}

function sectionadmin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.originalUrl;
  return res.redirect('/login-admin');
}

router.get('/logout', section, sectionadmin, function (req, res, next) {
  req.logout();
  return res.redirect('/');
});

function isPay(req, res, next) {
  if (req, user.Role === '0') {
    if (req.user.Status === 'US01') {
      return next();
    }
  }
  res.redirect('/messapprove');
}

module.exports = router;
