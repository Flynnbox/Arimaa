if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
}

arimaa = (function(){

	var isLogEnabled = false,
			emitter = LucidJS.emitter();

	log = function(object){
		if (isLogEnabled === true){
			console.log(object);
		}
	},

	isLoggingFunctionDefined = function(){
		return typeof(console) !== "undefined" && typeof(console.log) !== "undefined";
	},

	//wrap and hide how a function from third party lib so that alternate libraries could be used in future
	wrapFunction = function(functionToHide){
		return function(){
			var args = Array.prototype.slice.call(arguments);
			functionToHide.apply(null, args);
		};
	},

	trigger = wrapFunction(emitter.trigger),

	on = wrapFunction(emitter.on),

	isLogEnabled = isLoggingFunctionDefined();

	return {
		log: log,
		trigger: trigger,
		on: on
	};
}());