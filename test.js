'use strict';

const co = require('co');
const Promise = require('bluebird');

var arr = [ 1, 2, 3, 4, 5 ];

function handle(el) {
	return new Promise(function (resolve, reject){
		setTimeout(function(){
			console.log(el);
			resolve();
		}, 1000);
	});
} 

co(function *() {
    for (var index in arr) {
        var el = arr[index];
        yield handle(el);
    }
}).then(function(){
	console.log("done");
});
