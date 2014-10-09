var express = require('express')
  User = require("../models/user").User,
  router = express.Router(),
  redis = require('redis');

var redisClient = redis.createClient();

router.post('/',function(req, res) {
  console.log(req.user._id.toString(),"sends",req.body)
  redisClient.publish(req.user._id.toString(),JSON.stringify(req.body));
  res.end();
});

module.exports = router;
