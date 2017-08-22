var jsonfile = require('jsonfile');
var MongoClient = require('mongodb').MongoClient;


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


module.exports = {
    getJSONSQL,
    getmongoConnectionString,
    createDatabase,
    createCollection

}