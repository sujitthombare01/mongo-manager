var mongoUtils = require('./mongo-utils/mongoUtils.js');


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


//test for create collection
mongoUtils.createCollection('data_9234', 'entities_9234', function(err, results) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(results);

});

*
/