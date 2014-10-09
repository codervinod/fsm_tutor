var express = require('express')
  router = express.Router();

router.get('/', function(req,res){
  res.send({client_id:req.user._id.toString()});
  res.end();
});

module.exports = router;