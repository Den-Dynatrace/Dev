var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("splash2");
  res.redirect("/")
});


module.exports = router;
