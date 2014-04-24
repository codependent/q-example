var Q = require('q');
var fs = require('fs');
var PATH = "./.gitignore";

/* Convierte una función asíncrona en promesa - Usado con funciones con estilo Node.js callback err, result */
var readFile = Q.nfbind(fs.readFile);

var promise1 = readFile(PATH, "utf-8")

var promise2 = promise1
.then(function(text){
	console.log("@@@@2 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})

var promise21 = promise2
.then(function(text){
	console.log("@@@@????21 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("@@@@????211 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("@@@@????212 promise PATH - leído: "+text)
})

var promise22 = promise2
.then(function(text){
	console.log("@@@@¬¬¬¬22 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("@@@@¬¬¬¬221 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("@@@@¬¬¬¬222 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("@@@@¬¬¬¬223 promise PATH - leído: "+text)
})



var promise3 = promise1
.then(function(text){
	console.log("####3 promise PATH - leído: "+text)
	throw new Error("UPS!!!");
	return readFile(PATH, "utf-8");
})

var promise31 = promise3
.then(function(text){
	console.log("####----31 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("####----311 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
},function(err){
	console.error("####----311 ERROR ", err);
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("####----312 promise PATH - leído: "+text)
})
.fail(function(err){
	console.error("####---- 31 GLOBAL "+err);
})

var promise32 = promise3
.then(function(text){
	console.log("####>>>>32 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("####>>>>321 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("####>>>>322 promise PATH - leído: "+text)
	return readFile(PATH, "utf-8");
})
.then(function(text){
	console.log("####>>>>323 promise PATH - leído: "+text)
})