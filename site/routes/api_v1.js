var express = require('express')
  User = require("../models/user").User,
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  router = express.Router(),
  redis = require('redis');

var redisClient = redis.createClient();

passport.use(new BasicStrategy(
  function(client_id, client_secret, done) {
    User.authByClientIdSecret(client_id, client_secret,done);
  }
));

router.post('/sendEvent',function(req, res) {
  console.log(req.user._id.toString(),"sends",req.body)
  redisClient.publish(req.user._id.toString(),JSON.stringify(req.body));
  res.end();
});

router.post('/updateState', 
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    console.log('receieved updateState with data',req.body);
  });

module.exports = router;
