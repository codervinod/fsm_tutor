var express = require('express')
  router = express.Router();

router.get('/', function(req,res){
  res.send({client_id:req.user._id.toString(),client_secret:req.user.client_secret});
  res.end();
});

module.exports = router;