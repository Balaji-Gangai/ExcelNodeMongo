var express = require('express');
var multer = require('multer');
var path = require('path');
var userModel = require('./models/userModel');
var excelToJson = require('convert-excel-to-json');
var bodyParser = require('body-parser');
var upload = multer({
    dest: 'uploads/'
});
var apiRouter = require("./routes/api");
var fs = require('fs');
const { parse } = require('path');
var db = require('./controllers/db');
var readExcel = require('./controllers/readExcel');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var uploads = multer({
    storage: storage
});


var app = express();
//set the template engine  
app.set('view engine', 'ejs');
//fetch data from the request  
app.use(bodyParser.urlencoded({
    extended: false
}));
//static folder  
app.use(express.static(path.resolve(__dirname, 'public')));
//route for Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Upload excel file and import to mongodb
app.post('/uploadfile', upload.single("uploadfile"), (req, res) => {
    readExcel.importExcelData2MongoDB(__dirname + '/uploads/' + req.file.filename);    
    res.sendFile(__dirname + '/tableView.html');
});

// db connection
db.initialConnect();
app.use("/api/", apiRouter);

//assign port  
var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server run at port ' + port));
module.exports = app;