var express = require('express');
var router = express.Router();
const {isAuthenticated, mgmtCheck} = require('../public/javascripts/utils.js')
const {listAllDocs} = require('../db_queries.js');


/* GET users listing. */
router.get('/', async function(req, res, next) {
    tokenClaims = req.session.account.idTokenClaims;
    var user = tokenClaims.preferred_username.split("@")[0]
    var docs = await listAllDocs(user);
    var docString = JSON.stringify(docs);
    console.log(docString)

    res.render("deleteDoc", {docs: docs});
    
});


router.post('/', function(req, res, next){
    pass
})


module.exports = router;