var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  let mgmt = []
  let emps= []

  res.render("deleteUserEntry", {emps: emps, mgmt: mgmt});
  
});

router.post('/', function(req, res){
    userType = req.body.ManagerEmployee
    user = req.body.Individual
    if(userType = "Manager"){
        //mgmtdbcall(user)
    }else{
        //getMGMT
        //empdbcall(user)
    }
})


module.exports = router;
