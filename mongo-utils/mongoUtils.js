var jsonfile = require('jsonfile');
var MongoClient = require('mongodb').MongoClient;
var excel2Json = require('node-excel-to-json');


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
        excel2Json(xls_filename, function(err, output) {

            if (err) { callback(err); return; }

            insertJSON(dbname, collectionName, output[Object.keys(output)[0]], function(err, results) {

                if (err) {
                    console.log(err);
                    return;
                }
                callback(null, 'Inserted into Database');
                console.log('Inserted into Database :' + new Date());
            });

        });


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

module.exports = {
    getJSONSQL,
    getmongoConnectionString,
    createDatabase,
    createCollection,
    insertJSON,
    saveXLSintoCollection,
    getRecordsFromCollection


}