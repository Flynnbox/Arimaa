//contains error
//wraps sonsole.log functionality

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(arimaa.events) === 'undefined') {
    alert('requires events.js');
}

if (typeof(arimaa.error) === 'undefined') {
    arimaa.error = {};
}

arimaa.error = (function() {
	"use strict";

	return function(message){
		arimaa.events.error.emit(message);
	};
})();


