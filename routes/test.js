var express = require('express');
const { listAllDocs, getDoc } = require('../db_queries');
const { isAuthenticated } = require('../public/javascripts/utils');
var router = express.Router();

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
    console.log(documentToDel);
    //api string
    //API Call
    //console.log(response);
    res.redirect('test')
});


module.exports = router;
