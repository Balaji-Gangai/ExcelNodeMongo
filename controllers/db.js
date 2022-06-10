const {
  MongoClient
} = require("mongodb");
const app = require("../app");
// Connection URI
const uri = "mongodb://localhost:27017";
// Create a new MongoClient
const client = new MongoClient(uri);
var dbconnected;

module.exports = {
  initialConnect:function () {
    // Connect the client to the server
    client.connect();
    // Establish and verify connection
    dbconnected = client.db("toganesh");
    console.log("Connected successfully to server");
   
  },
  getDb: function () {
    return dbconnected;
  },
  insertData:function(insertData){
    // insert data      
    dbconnected.collection("dataTable").insert(insertData, function(err, res){
      if(err) throw err;
      console.log("Data inserted successfully...");              
      //client.close();
    });
  }
}

