var excelToJson = require('convert-excel-to-json');
var referenceObj = require('./../config');
var db = require('./db');
var fs = require('fs');
module.exports = {
    importExcelData2MongoDB:function(filePath){
        // -> Read Excel File to Json Data
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{
            // Excel Sheet Name
            name: 'EOC Problem Map Detail',
            // Header Row -> be skipped and will not be present at our result object.
            header: {
                rows: 1
            },
            // Mapping columns to keys

            columnToKey: {
                A: "{{A1}}",
                B: "{{B1}}",
                F: "{{F1}}",
                G: "{{G1}}",
                H: "{{H1}}",
                I: "{{I1}}",
                L: "{{L1}}",
                Q: "{{Q1}}",
                T: "{{T1}}",
                U: "{{U1}}",
                V: "{{V1}}",
                W: "{{W1}}",
                X: "{{X1}}",
                Y: "{{Y1}}",
                AA: "{{AA1}}",
                AB: "{{AB1}}",
                AC: "{{AC1}}",
                AD: "{{AD1}}",
                AE: "{{AE1}}",
                AF: "{{AF1}}",
                AG: "{{AG1}}",
                AH: "{{AH1}}",
                AI: "{{AI1}}",
                AJ: "{{AJ1}}"
            }
        }]
    });
    // -> Log Excel Data to Console
    var updatedList = JSON.stringify(excelData["EOC Problem Map Detail"], function (key, value) {return (value === undefined) ? "N/A" : value});

    var jsonData = JSON.parse(updatedList);
    //console.log("config:",referenceObj)
    var arrOP = [];
    for(var miniobj in jsonData){     
        var objOP = {}; 
        var partObj = {}; 
        let merged = {};   
        for(var value in jsonData[miniobj]){               
            for(const [key, val] of Object.entries(referenceObj)){
                //console.log("check:",val,": Check 2:",referenceObj[key])
                if(val === value){
                    //console.log(key ,":::",jsonData[miniobj][value]);
                    objOP[key] = jsonData[miniobj][value];
                }                
                if(key === "PartOf"){                   
                    partObj["PartOf"] = [{
                        "Edition Name": jsonData[miniobj][referenceObj["Edition Name"]],
                        "Question Name": jsonData[miniobj][referenceObj["Question Name"]]
                    }];
                }
            } 
            merged = {...objOP, ...partObj};
            //console.log(Object.keys(referenceObj)[index]," ::::: ",value," ::::", jsonData[miniobj][value]);
            
        }
        arrOP.push(merged);        
    }
    var jsonOP = JSON.stringify(arrOP);
    // console.log("excel data:", jsonOP);
    // fs.writeFile("C:/BalajiGopal/work/2022/ToGanesh/users.json", jsonOP, err => {
    //     // Checking for errors
    //     if (err) throw err;
    //     console.log("Done writing"); // Success
    // });

   // Insert Data to mongo DB.
    db.insertData(JSON.parse(jsonOP));
    fs.unlinkSync(filePath);    
    }
}