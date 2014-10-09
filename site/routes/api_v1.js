var express = require('express')
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  User = require("../models/user").User,
  router = express.Router(),
  redis = require('redis');

var redisClient = redis.createClient();

passport.use(new BasicStrategy(
  function(client_id, client_secret, done) {
  	User.authByClientIdSecret(client_id, client_secret,done);
  }
));

router.get('/getUrlCat', 
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    var dom=req.query.domain;

    redisClient.hgetall('dom-'+dom,function(err,dom_obj){
      if(err){
        res.json(err);
        return;
      }
      res.json(dom_obj);
    });
  });

module.exports = router;
