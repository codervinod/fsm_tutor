var express = require('express')
  User = require("../models/user").User,
  router = express.Router();

router.post('/', function(req,res,next){
  var user = new User({email:req.body.email,
    password:req.body.password,
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    account_creation_date:new Date(),
    profile_created:true
  });
  
  user.save(function(err){
    if(err) {
      console.log(err);
      return next(err);
    }

    req.login(user, function(err) {
      if (err) { return next(err); }
      console.log("local user login success");
      res.end();
    });
  });
});

module.exports = router;