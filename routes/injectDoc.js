var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const {inject} = require('../db_queries.js');
var user = "erik.sundblad";

/* GET Inject view */
router.get('/', function(req, res, next) {
  res.render('injectDoc');
});

router.post('/', async function (req, res, next) {
  var overall = await req.body.subject;
  var subcat = await req.body.topic;
  var metric = await req.body.chapter;
  var tag = req.body.tags;
  var proof = await req.body.proof
  var notes = await req.body.Comment
  doc = {
    "Overall" : overall,
    "Sub-Cat" : subcat,
    "metric" : metric,
    "value" : req.body.val,
    "Proof" : proof,
    "Notes" : notes,
    "Tag" : tag
    }
    //console.log(doc)
    inject(user, doc)
    res.redirect('/')
  })

module.exports = router;