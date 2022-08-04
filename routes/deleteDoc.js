var express = require('express');
var router = express.Router();
const {isAuthenticated, delDoc} = require('../public/javascripts/utils.js')
const {listAllDocs, getDoc, deleteDocument} = require('../db_queries.js');
var apiString = process.env.GRAPH_API_ENDPOINT + "v1.0/drives/" + process.env.DRIVE_ID + "/items/";

/* GET users listing. */
router.get('/', isAuthenticated, async function(req, res, next) {
    tokenClaims = req.session.account.idTokenClaims;
    var user = tokenClaims.preferred_username.split("@")[0]
    var docs = await listAllDocs(user);
    shortDocs = []
    for(e in docs){
        shortDocs.push(docs[e]["metric"] + '|' + docs[e]["_id"]);
    }

    res.render("deleteDoc", {docs: shortDocs, mgmt:false, user:user});
    
});


router.post('/', isAuthenticated, async function(req, res, next){
    id = req.body.document;
    var user = tokenClaims.preferred_username.split("@")[0]
    documentToDel = await getDoc(user, id);
    delString = apiString + documentToDel.DriveID;
    token = req.session.accessToken
    await delDoc(delString, token)
    await deleteDocument(user, id);
    res.redirect('/profile');
});


router.post('/mgmt', isAuthenticated, async function(req, res, next){
    var id = req.body.document;
    var user = req.body.user;
    var documentToDel = await getDoc(user, id);
    var delString = apiString + documentToDel.DriveID;
    var token = req.session.accessToken
    await delDoc(delString, token)
    await deleteDocument(user, id);
    res.redirect('/manager');
})


module.exports = router;