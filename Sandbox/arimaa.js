if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
}

// arimaa = (function(){

// 	//wrap a function from third party lib so that it can be swapped out for alternate libs in future with minimal impact
// 	wrapFunction = function(functionToHide){
// 		return function(){
// 			var args = Array.prototype.slice.call(arguments);
// 			functionToHide.apply(null, args);
// 		};
// 	},

// 	return {};
// }());