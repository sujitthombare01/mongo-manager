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
console.log('Start :' + new Date());

mongoUtils.saveXLSintoCollection('test', 'products', 'C:\\Javascript\\dim_product.xlsx', function(err, results) {

    if (err) {
        console.log(err);
        return;
    }
    console.log(results);
    console.log('Inserted into Database :' + new Date());
});

*/
var query = { 'P_GACactive': 'Active', 'P_CompanyCode': 'ACA' };
var options = { 'sort': 'P_GACactive' };
console.log('Start :' + new Date());
mongoUtils.getRecordsFromCollection('test', 'products', query, options, function(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result.length);
    console.log('END :' + new Date());

});