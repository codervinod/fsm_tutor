var express = require('express')
  User = require("../models/user").User,
  router = express.Router(),
  redis = require('redis');

var redisClient = redis.createClient();

router.post('/',function(req, res) {
  console.log(req.body);
  console.log(req.user._id.toString())
  res.end();
});

module.exports = router;
