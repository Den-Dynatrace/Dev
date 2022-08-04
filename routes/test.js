var express = require('express');
const { listAllDocs, getDoc } = require('../db_queries');
const { isAuthenticated } = require('../public/javascripts/utils');
var router = express.Router();
const axios = require("axios");
var apiString = process.env.GRAPH_API_ENDPOINT + "v1.0/drives/" + process.env.DRIVE_ID + "/items/";


async function delDoc(endpoint, accessToken) {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    console.log(`request made to ${endpoint} at: ` + new Date().toString());

    try {
        const response = await axios.delete(endpoint, options);
        return await response.data;
    } catch (error) {
        throw new Error(error);
    }
}


/* GET users listing. */
router.get('/',isAuthenticated, async function(req, res, next) {
  doc = await listAllDocs("erik.sundblad");
  shortDocs = []
  for(e in doc){
      shortDocs.push(doc[e]["metric"] + '|' + doc[e]["_id"]);
  }
  res.render("test", {docs: shortDocs});
});

router.post('/', isAuthenticated, async function(req, res){
    docID = req.body.document;
    documentToDel = await getDoc("erik.sundblad", docID);
    delString = apiString + documentToDel.DriveID;
    token = req.session.accessToken
    response = await delDoc(delString, token)
    console.log(response);
    res.redirect('test')
});


module.exports = router;
