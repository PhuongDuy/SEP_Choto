var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
  if (req.session.oldUrl) {
    let currentUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(currentUrl);
  } else {
    res.redirect('/');
  }
});



module.exports = router;
