//contain event definitions and pub/sub logic
//wraps LucidJS functionality

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(LucidJS) === 'undefined') {
    alert('requires LucidJS.js');
}

if (typeof(arimaa.events) === 'undefined') {
    arimaa.events = {};
}

arimaa.events = (function() {
	"use strict";

	var emitter = LucidJS.emitter(),

	bindEventKey = function(key){
		return{
			on: emitter.on.bind(undefined, key),
			emit: emitter.trigger.bind(undefined, key)
		}
	};

	return {
		error: bindEventKey('arimaa.error'),
		movePiece: bindEventKey('arimaa.movePiece'),
   	beginTurn: bindEventKey('arimaa.beginTurn'),
   	endTurn: bindEventKey('arimaa.endTurn'),
   	squareSelected: bindEventKey('arimaa.squareSelected'),
   	ui_click: bindEventKey('arimaa.ui.click')
	};
})();