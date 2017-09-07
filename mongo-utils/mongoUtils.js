var jsonfile = require('jsonfile');
var MongoClient = require('mongodb').MongoClient;
var excel2Json = require('node-excel-to-json');
var XLSX = require('xlsx');


// Read all MongoDB Connection Configuration
var getJSONSQL = function() {
    var file_name = process.cwd() + '\\dbconfig\\MongoConfig.json';

    var jsonObj = jsonfile.readFileSync(file_name);

    return jsonObj;

}

//Get mongodb connection String
var getmongoConnectionString = function(num) {

    if (num === undefined) num = 0;
    if (isNaN(num)) num = 0;

    return getJSONSQL().connections[num].connection;
}

// create new database in MongoDb ***need to create at least one collection
var createDatabase = function(dbname, callback) {
    if (!dbname) {
        callback('Please enter database name.');
        return;
    }

    var url = getmongoConnectionString() + dbname;

    MongoClient.connect(url, function(err, db) {
        if (err) { callback(err); return; }
        console.log(url);

        db.createCollection('itss', function(err, result) {
            if (err) { callback(err); return; }

            db.close();
            callback(null, 'Database Created :' + dbname);


        });


    });

}


// create new collection in MongoDb
var createCollection = function(dbname, collectionName, callback) {
    if (!dbname) {
        callback('Please enter database name.');
        return;
    }
    if (!collectionName) {
        callback('Please enter collection name.');
        return;
    }

    var url = getmongoConnectionString() + dbname;

    MongoClient.connect(url, function(err, db) {
        if (err) { callback(err); return; }
        console.log(url);

        db.createCollection(collectionName, function(err, result) {
            if (err) { callback(err); return; }

            db.close();
            callback(null, 'Collection \'' + collectionName + '\' Created in Database \'' + dbname + '\' ');


        });


    });

}

var insertJSON = function(dbname, collectionName, json, callback) {
        if (!dbname) {
            callback('Please enter database name.');
            return;
        }
        if (!collectionName) {
            callback('Please enter collection name.');
            return;
        }
        if (!json) {
            callback('Please enter json object.');
            return;
        }
        var url = getmongoConnectionString() + dbname;

        MongoClient.connect(url, function(err, db) {
            if (err) { callback(err); return; }
            db.collection(collectionName).insert(json, function(err, result) {
                if (err) { callback(err); return; }

                callback(null, result);
                db.close();
            });




        });

    }
    // save data into collection
var saveXLSintoCollection = function(dbname, collectionName, xls_filename, callback) {
    if (!dbname) {
        callback('Please enter database name.');
        return;
    }
    if (!collectionName) {
        callback('Please enter collection name.');
        return;
    }
    if (!xls_filename) {
        callback('Please enter xls_filename.');
        return;
    }

    var workbook = XLSX.readFile(xls_filename);
    console.log("File read completed :" + new Date());
    var jsons = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    console.log("File converted into JSON :" + new Date());

    insertJSON(dbname, collectionName, jsons, function(err, results) {

        if (err) {
            console.log(err);
            return;
        }
        callback(null, 'Inserted into Database');
        console.log('Inserted into Database :' + new Date());
    });




}




var saveXLSintoCollectionBulk = function(dbname, collectionName, xls_filename, callback) {
    if (!dbname) {
        callback('Please enter database name.');
        return;
    }
    if (!collectionName) {
        callback('Please enter collection name.');
        return;
    }
    if (!xls_filename) {
        callback('Please enter xls_filename.');
        return;
    }

    var workbook = XLSX.readFile(xls_filename);
    console.log("File read completed :" + new Date());
    var jsons = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    console.log("File converted into JSON :" + new Date());
    console.log(jsons);
    /*
        var url = getmongoConnectionString() + dbname;

        MongoClient.connect(url, function(err, db) {cls
            if (err) { callback(err); return; }

            var ordered = db.collection(collectionName).initializeUnorderedBulkOp();
            for (var i = 0; i < jsons.length; i++) {
                ordered.insert(jsons[i]);

            }
            ordered.execute();
            console.log('Inserted into Database :' + new Date());
            db.close();
        });
    */





}




//get recordset
var getRecordsFromCollection = function(dbname, collectionName, query, options, callback) {


        if (!dbname) {
            callback('Please enter database name.');
            return;
        }
        if (!collectionName) {
            callback('Please enter collection name.');
            return;
        }

        var url = getmongoConnectionString() + dbname;
        MongoClient.connect(url, function(err, db) {
            if (err) { callback(err); return; }
            db.collection(collectionName).find(query, options).toArray(function(err, document) {

                if (err) {
                    console.log(err);
                    return;
                }

                callback(null, document);
                // console.log(document);

                db.close();
            });




        });


    }
    // function for upload complete xlx into collections
var uploadCompleteXls = function(dbname, collectionName, xls_filename, callback) {
    if (!dbname) {
        callback('Please enter database name.');
        return;
    }
    if (!collectionName) {
        callback('Please enter collection name.');
        return;
    }
    if (!xls_filename) {
        callback('Please enter xls_filename.');
        return;
    }
    var workbook = XLSX.readFile(xls_filename);
    for (var s = 0; s < workbook.SheetNames.length; s++) {
        // console.log('Sheet Name :' + workbook.SheetNames[s]);
        var sheetname = workbook.SheetNames[s];
        sheetname = sheetname.replace(' ', '');
        // console.log('Collection Name :' + sheetname);
        var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[s]]);
        // console.log('JSON Count :' + json.length);
        var jsonObj = {
            [sheetname]: json
        };

        insertJSON(dbname, collectionName, jsonObj, function(err, results) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });


    }



}

module.exports = {
    getJSONSQL,
    getmongoConnectionString,
    createDatabase,
    createCollection,
    insertJSON,
    saveXLSintoCollection,
    saveXLSintoCollectionBulk,
    getRecordsFromCollection,
    uploadCompleteXls


}