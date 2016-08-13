var utils = require('./utils.js'); // do this to call functions in other file
var repository = require('../repository');
var Promise = require('bluebird');
var async = require('async');

loopForAsynchronousInsertInMongoDB();

// not async way - dont do this !
function loopForInsertInMongoDB() {
    for (var i = 0; i < 5; i++) {
        insertOnMongoDB(i);
    }
}

// Asynchronous way - Do this way

function loopForAsynchronousInsertInMongoDB() {

// U S A G E : #################################################################

    Promise.resolve(DoSomethingFirst()) // some starting promise or method 
        .then(firstFunction)
        .then(secondFunction)
        .then(thirdFunction)
        .then(fourthFunction)

        .error(function (e) {
            console.log("Error handler " + e)
        })
        .catch(function (e) {
            console.log("Catch handler " + e)
        });


// F U N C T I O N S  : ########################################################


    function DoSomethingFirst() {
        console.log('doing something first..');
    }

    function firstFunction() {

        return new Promise(function (resolve) {
            console.log('Hi! i am first function ');
            console.log('waiting till first function is finish....');
            console.log('second function will start only when first function finish (timeout of 7 seconds)!');
            setTimeout(function () {
                resolve();
            }, 7000);
        });

    }


    function secondFunction() {

         return new Promise(function (resolve) {

             console.log('');
             console.log('hello im second function  ( from 0 to 4 )! #######################');
             var count = 0;
             var current = 0;

             async.whilst(
                 function () {
                     return count < 5;
                 },
                 function (callback) {

                     insertOnMongoDB(current);
                     count++;
                     current++;

                     setTimeout(callback, 500); // better minimum 500 for timeOut so things go smooth
                 },
                 function (err) {
                     resolve();
                 }
             );
         })

    }


    function thirdFunction() {

        return new Promise(function (resolve) {

            console.log('');
            console.log('hello im third function  ( from 5 to 9 )! #######################');
            var count = 5;
            var current = 5;

            async.whilst(
                function () {
                    return count < 10;
                },
                function (callback) {

                    insertOnMongoDB(current);
                    count++;
                    current++;

                    setTimeout(callback, 500); // better minimum 500 for timeOut so things go smooth
                },
                function (err) {
                    resolve();
                }
            );
        })


    }
    
    
    function fourthFunction() {
        console.log('');
        console.log('this will be the FINAL line...................');
    }



}


function insertOnMongoDB(number) {
    var data = {
        cenas: number
    };
    repository.fillNewEnergyData(data);
}

