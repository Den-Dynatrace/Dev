/**
 * Profile Router to handle GET profile request
 * profile has no POST request functionality
 * Main view page populates metric values from db
 */
var express = require('express');
var router = express.Router();
const {numberQuery, empID, mgmtList, managagerUpdate, newManager} = require('../db_queries.js')
var queries = require('../individual.js')
const {isAuthenticated, isMGMT} = require('../public/javascripts/utils.js')
const fetch = require("../public/javascripts/fetch")
const GRAPH_ME_ENDPOINT = process.env.GRAPH_API_ENDPOINT + "v1.0/me";


//handle GET profile page
//checks for authentication and is Manager
router.get('/',isAuthenticated, isMGMT, async function(req, res) {
  tokenClaims = req.session.account.idTokenClaims;
  var user = tokenClaims.preferred_username.split("@")
  user = user[0].toLowerCase()    //all db usernames are lowercase
  GRAPH_MANAGER = GRAPH_ME_ENDPOINT + "/manager";   
  const manager = await fetch(GRAPH_MANAGER, req.session.accessToken);  //get user manager card graph API
  let manager_id = manager.mail.toLowerCase();  // all need to be lowercase to match db
  
  //Variables for sum totals at botom of page
  let results =[];
  let total = 0;
  let contenLabTot = 0;
  let prodFeedTot = 0;
  let evangelTot = 0;
  let recogTot = 0;
  
  //console.log(user)
  id = await empID(user)
  //Check if user exists if not forward to new user
  if(id.length > 0){ 
    //double check that manager in db matches manager in Active Directory
    if (id[0].manager.toLowerCase() != manager_id){
      //update user id card with correct manager
      await managagerUpdate(user, manager_id); 
      let mgmList = [];
      const raw = await mgmtList();
      for(var item in raw){
          mgmList.push(raw[item]["_id"])
      }
      // if a new manager add to the db
      if(!mgmList.includes(manager_id)){
          await newManager(manager);
      }
    }
        

    for (let query in queries) {
      // run all queries from individual.js 
      val = await numberQuery(queries[query], user)
      total += val[0]

      //while running aggregate the corresponding totals 
      if(query < 11) {contenLabTot += val[0];}
      else if(query < 22  ) {prodFeedTot += val[0];}
      else if(query < 30 ) {evangelTot += val[0];}
      else {recogTot += val[0];}
      //array to store results of db queries 
      results.push(val)
    }
    res.render('profile', { i0: id[0].name,
                          i1: id[0].Position,
                          i2: id[0].Location,
                          // resutl[x][0] = sum of metric, result[x].slice(1) = array of strings =["id | link",...]
                          a0: results[0][0], b0: results[0].slice(1),   //# of sessions
                          a1: results[1][0], b1: results[1].slice(1), //# of videos
                          a2: results[2][0], b2: results[2].slice(1), //# of DU Content
                          a3: results[3][0], b3: results[3].slice(1), //# of treainings del.
                          a4: results[4][0], b4: results[4].slice(1), //CSAT score
                          a5: results[5][0], b5: results[5].slice(1), //# of meetings participated in
                          a6: results[6][0], b6: results[6].slice(1), //# of best practice guides
                          a7: results[7][0], b7: results[7].slice(1), //# of topics dev.
                          a8: results[8][0], b8: results[8].slice(1), //# of labe enviros
                          a9: results[9][0], b9: results[9].slice(1), //# of others using labs
                          a10: results[10][0], b10: results[10].slice(1), //# of others participating in lab dev
                          a11: results[11][0], b11: results[11].slice(1), //# of topics reviewed
                          a12: results[12][0], b12: results[12].slice(1), //# of trends identified
                          a13: results[13][0], b13: results[13].slice(1), //# of recommendations provided
                          a14: results[14][0], b14: results[14].slice(1), //# of Answer bots developed
                          a15: results[15][0], b15: results[15].slice(1), //# of TKB's created/edited
                          a16: results[16][0], b16: results[16].slice(1), //# of aritlces written
                          a17: results[17][0], b17: results[17].slice(1), //#/% inc./ of self help 
                          a18: results[18][0], b18: results[18].slice(1), //#/% dec. in chats
                          a19: results[19][0], b19: results[19].slice(1), //# of product enhancements requested/released
                          a20: results[20][0], b20: results[20].slice(1), //#/% increase of self-help
                          a21: results[21][0], b21: results[21].slice(1), //#/% decresse in chats
                          a22: results[22][0], b22: results[22].slice(1), //# of meetings attended
                          a23: results[23][0], b23: results[23].slice(1), //# of groups represented in 
                          a24: results[24][0], b24: results[24].slice(1), //# of articles published
                          a25: results[25][0], b25: results[25].slice(1), //# reads per article
                          a26: results[26][0], b26: results[26].slice(1), //# of conferences attended
                          a27: results[27][0], b27: results[27].slice(1), //# of presentations shared
                          a28: results[28][0], b28: results[28].slice(1), //# of internal meetings where TPS is highlighted
                          a29: results[29][0], b29: results[29].slice(1), //# of meetings where TPS is presenting on a global or cross-regional basis
                          a30: results[30][0], b30: results[30].slice(1), //# of advanced certs
                          a31: results[31][0], b31: results[31].slice(1), //# of advanced training courses completed
                          a32: results[32][0], b32: results[32].slice(1), //# of customer meetings on SME topic, CSAT% 
                          a33: results[33][0], b33: results[33].slice(1), //# of hours in chat outside shift
                          a34: results[34][0], b34: results[34].slice(1), //# of escalations handled
                          a35: results[35][0], b35: results[35].slice(1), //# of new.improved processes
                          a36: results[36][0], b36: results[36].slice(1), //%time/efficiancy improvement
                          v0: total,            
                          v1: contenLabTot, 
                          v2: prodFeedTot,
                          v3: evangelTot,
                          v4: recogTot
                        });
  }
  
  else{
    // add new user not found in db
    res.redirect("newUser")
  }
   
});

module.exports = router;
