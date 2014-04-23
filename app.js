var Q = require('q');
var fs = require('fs');
var PATH = "./.gitignore";
var PATH2 = "./.gitignore";
var PATH3 = "./inexistent.txt";

//Llamada normal asíncrona
fs.readFile(PATH, 'utf8', function(err,data){
	if(err){
		console.error('**** fs.readFile PATH - error: ' +err);
	}else{
		console.log('**** fs.readFile PATH - dat: '+data);	
		fs.readFile(PATH2, 'utf8', function(err2,data2){
			if(err2){
				console.error('**** fs.readFile PATH2 - error: ' +err2);
			}else{
				console.log('**** fs.readFile PATH2 - dat: '+data2);	
				fs.readFile(PATH3, 'utf8', function(err3,data3){
					if(err3){
						console.error('**** fs.readFile PATH3 - error: ' +err3);
					}else{
						console.log('**** fs.readFile PATH3 - dat: '+data3);	
					}	
				});
			}	
		});
	}	
});


/* Esto solo para syncs */
Q(fs.readFileSync(PATH, 'utf8'))
.then(function(data){
	console.log('$$$$ Q(fs.readFileSync()) PATH - datos: '+data);
	return Q(fs.readFileSync(PATH2, 'utf8'));
})
.then(function(data){
	console.log('$$$$ Q(fs.readFileSync()) PATH2 - datos: '+data);
	return Q(fs.readFileSync(PATH3, 'utf8'));
})
.then(function(data){
	console.log('$$$$ Q(fs.readFileSync()) PATH3 - datos: '+data);
})
.fail(function(err){
	console.error("$$$$ Q(fs.readFileSync()) - error: "+err);
});


/* Convierte una función asíncrona en promesa */
var readFile = function (path, encoding) {
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
	return Q.nfcall(fs.readFile, path, encoding);
};

readFile(PATH, "utf-8")
.then(function(text){
	console.log("@@@@ promise PATH - leído: "+text)
	return readFile(PATH2, "utf-8");
})
.then(function(text){
	console.log("@@@@ promise PATH2 - leído: "+text)
	return readFile(PATH3, "utf-8");
})
.then(function(text){
	console.log("@@@@ promise PATH3 - leído: "+text)
})
.fail(function(error){
	console.error("@@@@ promise - error: " +error);
});


/* Convierte una función asíncrona en promesa - Usado con funciones con estilo Node.js callback err, result */
var readFile2 = Q.nfbind(fs.readFile);
	
readFile2(PATH, "utf-8")
.then(function(text){
	console.log("---- promise PATH - leído: "+text)
	return readFile2(PATH2, "utf-8");
})
.then(function(text){
	console.log("---- promise PATH2 - leído: "+text)
	return readFile2(PATH3, "utf-8");
})
.then(function(text){
	console.log("---- promise PATH3 - leído: "+text)
})
.fail(function(error){
	console.error("---- promise - error: " +error);
});
