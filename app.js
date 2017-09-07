var mongoUtils = require('./mongo-utils/mongoUtils.js');
var XLSX = require('xlsx');
var excel2Json = require('node-excel-to-json');

/*
// test for create database
mongoUtils.createDatabase('data_9234', function(err, results) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(results);

});

*/

/*
//test for create collection
mongoUtils.createCollection('data_9234', 'entities_9234', function(err, results) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(results);

});
*/
/*
//insert record into collection
mongoUtils.insertJSON('test', 'emp', [{ "name": "xyz1", "age": 20 }, { "name": "xyz2", "age": 20 }, { "name": "xyz3", "age": 20 }], function(err, results) {

    if (err) {
        console.log(err);
        return;
    }

    console.log(results);
});

*/
/*

//load and insert xls into collection
var startdate = new Date();
console.log('Start :' + startdate);

mongoUtils.saveXLSintoCollectionBulk('test', 'packinglist', 'C:\\Javascript\\test.xlsx', function(err, results) {

    if (err) {
        console.log(err);
        return;
    }
    //console.log(results);
    var enddate = new Date();
    //  console.log('Inserted into Database :' + new Date());
    console.log('Time required for Job (in Sec) : ' + ((enddate - startdate) / 1000));
});

*/


var startdate = new Date();
console.log('Start :' + startdate);

mongoUtils.uploadCompleteXls('test', 'orgdata', 'C:\\Javascript\\excel_json.xls', function(err, results) {

    if (err) {
        console.log(err);
        return;
    }
    //console.log(results);
    var enddate = new Date();
    //  console.log('Inserted into Database :' + new Date());
    console.log('Time required for Job (in Sec) : ' + ((enddate - startdate) / 1000));
});




/*
//read database
var query = {}; //{ 'P_GACactive': 'Active', 'P_CompanyCode': 'ACA' };
var options = {};
var startdate = new Date();

mongoUtils.getRecordsFromCollection('test', 'products', query, options, function(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    //    console.log(result);
    for (var i = 0; i <= result.length; i++) {
        console.log(result[i].P_LDT)
        break;
    };

    var enddate = new Date();

    console.log('Number of records :' + i);
    console.log('Time required for Job (in Sec) : ' + ((enddate - startdate) / 1000));


});

*/