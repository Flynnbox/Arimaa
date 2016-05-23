//contains log
//wraps sonsole.log functionality

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(arimaa.log) === 'undefined') {
    arimaa.log = {};
}

arimaa.log = (function() {
	"use strict";

	var isLogEnabled = false,
			isDebugEnabled = false,

	log = function(object){
		if (isLogEnabled === true){
			console.log(object);
		}
	},

	debug = function(object){
		if (isDebugEnabled === true){
			log(object);
		}
	},

	isLoggingFunctionDefined = function(){
		return typeof(console) !== "undefined" && typeof(console.log) !== "undefined";
	},

	isLogEnabled = isLoggingFunctionDefined();

	arimaa.events.error.on(log);

	return log;
})();