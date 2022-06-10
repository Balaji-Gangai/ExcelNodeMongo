var express = require('express');
var router = express.Router();
var db = require('../controllers/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/getAllData', function (req, res, next) {
    var dbconnection = db.getDb();
    console.log(dbconnection);
    dbconnection.collection("dataTable").find({}).toArray(function(err, result){
        if(err) throw err;
        console.log("Data received successfully...");
        res.json(result);
      })
    
});

module.exports = router;