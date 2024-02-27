var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('./users')
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));




// register route
router.post('/register', function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/profile');
      })
    })
});


router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('index');
});

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}




router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function (req, res) { })

module.exports = router;
