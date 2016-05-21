if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
}

arimaa = (function(){

	var isLogEnabled = false,
			isDebugEnabled = true,
			emitter = LucidJS.emitter();

	log = function(object){
		if (isLogEnabled === true){
			console.log(object);
		}
	},

	debug = function(object){
		if (isLogEnabled === true && isDebugEnabled === true){
			console.log(object);
		}
	},

	error = function(message){
		arimaa.trigger('arimaa.error', message);
	}

	isLoggingFunctionDefined = function(){
		return typeof(console) !== "undefined" && typeof(console.log) !== "undefined";
	},

	//wrap a function from third party lib so that it can be swapped out for alternate libs in future with minimal impact
	wrapFunction = function(functionToHide){
		return function(){
			var args = Array.prototype.slice.call(arguments);
			functionToHide.apply(null, args);
		};
	},

	trigger = wrapFunction(emitter.trigger),

	on = wrapFunction(emitter.on),

	isLogEnabled = isLoggingFunctionDefined();

	on('arimaa.error', log);

	return {
		debug: debug,
		log: log,
		error: error,
		trigger: trigger,
		on: on
	};
}());