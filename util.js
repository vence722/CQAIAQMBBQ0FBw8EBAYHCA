'use strict';

/**
* use GET method to retrieve data from a specified URL with HTTP(s) protocol
* in Promise form
*
* @param {string} url - the URL of the request
* @function
*/
function getContent(url) {
	// return new pending promise
	return new Promise(function (resolve, reject) {
		// select http or https module, depending on reqested url
		const lib = url.startsWith('https') ? require('https') : require('http');
		const request = lib.get(url, function (response) {
			// handle http errors
			if (response.statusCode < 200 || response.statusCode > 299) {
				reject(new Error('Failed to load page, status code: ' + response.statusCode));
			}
			// temporary data holder
			const body = [];
			// on every content chunk, push it to the data array
			response.on('data', (chunk) => body.push(chunk));
			// we are done, resolve promise with those joined chunks
			response.on('end', () => resolve(body.join('')));
		});
		// handle connection errors of the request
		request.on('error', (err) => reject(err));
	});
}

/**
* round the number with specified precision
*
* @param {number} number - the value to be rounded
* @param {number} precision - the number of digits that remains after point
* @function
*/
function round(number, precision) {
	let factor = Math.pow(10, precision);
	let tempNumber = number * factor;
	let roundedTempNumber = Math.round(tempNumber);
	return roundedTempNumber / factor;
}

exports.getContent = getContent;
exports.round = round;
