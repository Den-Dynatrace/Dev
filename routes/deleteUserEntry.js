var express = require('express');
var router = express.Router();
const {mgmtList, getCollections} = require('../db_queries');
const {isAuthenticated} = require('../public/javascripts/utils.js')
function mgmtCheck(req, res){
    if(!req.session.mangment){
        res.redirect("/")
    }
}

/* GET users listing. */
router.get('/', isAuthenticated, mgmtCheck, async function(req, res) {
  let mgmt = await mgmtList();
  let emps= await  getCollections();
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
