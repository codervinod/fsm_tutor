var express = require('express')
  , router = express.Router();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require("../models/user").User;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(email, passwd, done) {
    User.local_authenticate(email,passwd,function(err,user){
      if (err) { return done(null,false,err); }
      return done(null, user);
    });
  }
));

router.post('/',
  passport.authenticate('local'), function(req, res) {
    res.send({});
    res.end();
  }
);

module.exports = router;
