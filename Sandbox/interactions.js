//acts as a weak controller to throw events based on ui published actions

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(arimaa.interactions) === 'undefined') {
    arimaa.interactions = {};
}

arimaa.interactions = function(renderProvider) {
	"use strict";

	var renderer = renderProvider,
			selectedSquare = null,

	subscribe = function(){
		arimaa.on('arimaa.squareSelected', squareSelected);
	},

	squareSelected = function(newSquare) {
    if (selectedSquare !== null){ 	
    	arimaa.log('deselecting ' + selectedSquare.toString());
    	arimaa.trigger('arimaa.squareDeselected', selectedSquare);
    	renderer.lowlightSquare(selectedSquare);
    	if (selectedSquare.isEqual(newSquare)){    	
    		selectedSquare = null;
    		return;
    	}
    }
  	selectedSquare = newSquare;
  	arimaa.log('selecting ' + selectedSquare.toString());
  	renderer.highlightSquare(selectedSquare);
	};

	subscribe();

	return{
	};
};