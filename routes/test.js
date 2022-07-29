var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("test", {clientID: process.env.CLIENT_ID});
  
});

router.post('/', function(req, res){
  console.log(req.body.prooflink);
  res.redirect("test");
})
module.exports = router;