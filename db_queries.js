require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://sme-database:ulb91PoDqNRdCLBvnBjcjQQPBzeOabzijeeOyBsIkryMeBD8VPmbMvO9FxzxQzsxxRD61RJdG4HmGmN0AvlpAg==@sme-database.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@sme-database@";
const client = new MongoClient(uri);


function inject(user, doc){
    //INSERT ONE//
    client.connect(err => {
        const collection = client.db("SME_Tracker").collection(user);
        if (err) throw err;
        collection.insertOne(doc, function(err, res){
            if (err) throw err;
            console.log("Inserted Docs");
        });
        
    });
}


async function employeeNames(managerName){
    return new Promise(function(resolve, reject) {
      const connect = client.db("SME_Tracker")
      connect.collection("managers").find({"name": managerName}).project({Employees: 1}).toArray(function(err, results) {   
          if(err) {
            return reject(err)
          }
          //console.log(results[0]["Employees"])
          return resolve(results[0]["Employees"])
        });
  });
}


function tagQuery(tag, language){
  //TAG QUERY//
  client.connect(err => {
    const connect = client.db("SME_Tracker")
    connect.collection
  });
}

async function numberQuery(query, user){ 
//SIMPLE QUERY//
return new Promise(function(resolve, reject) {
  const connect = client.db("SME_Tracker")
  connect.collection(user).find(query).toArray( async function(err, docs) {
   if (err) {
     // Reject the Promise with an error
     return reject(err)
   }
   console.log(docs.length)
   // Resolve (or fulfill) the promise with data
   return await resolve(docs.length)
 })
})
}

async function empID(user){
  return new Promise(function(resolve, reject) {
    const connect = client.db("SME_Tracker")
    connect.collection(user).find({"id_card": "ID Card"}).toArray( async function(err, docs){
      if (err){
        return reject(err)
      }
      console.log(docs)
      return await resolve(docs)
    })
  })
}

function dropCollection(user){
  client.connect(err => {
    const collection = client.db("SME_Tracker").collection(user)
    if (err) throw err;
    collection.drop(function(err, res){
      if (err) throw err;
      console.log("Collection Droped")
    })
  })
}

exports.numberQuery = numberQuery
exports.empID = empID
exports.inject = inject
exports.employeeNames = employeeNames