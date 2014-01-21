var Q = require('q');
var fs = require('fs');
var readFile = function (path) {
	console.log('read '+path);
	
	/*fs.readFile(path, 'utf8',function(err,data){
		console.log('data '+data);
		console.log('error ' +err);
	});*/

	/* Esto solo para syncs
	Q(fs.readFileSync(path, 'utf8'))
	.then(function(data){
		console.log('datos'+data);
	}).fail(function(err){
		console.err("error "+err);
	});*/

	
	/* para funciones async
	var deferred = Q.defer();
	fs.readFile(path, "utf-8", function (error, text) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
	*/

	/* Igual pero de manera más simple*/
	return Q.nfcall(fs.readFile, path, "utf-8");
};

readFile('./app.js')
.then(function(text){
	console.log("leído "+text)
})
.fail(function(error){
	console.error(error);
});
