if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
}

arimaa = (function(){

	var isLogEnabled = false,

	log = function(object){
		if (isLogEnabled === true){
			console.log(object);
		}
	},

	isLoggingFunctionDefined = function(){
		return typeof(console) !== "undefined" && typeof(console.log) !== "undefined";
	};

	isLogEnabled = isLoggingFunctionDefined();

	return {
		log: log
	};
}());