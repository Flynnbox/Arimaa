if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
    alert('requires arimaa.js');
}

if (typeof(arimaa.boardState) === 'undefined') {
    arimaa.boardState = {};
}

arimaa.boardState = function(newBoard) {
	"use strict";

	var board = newBoard,
			currentState = [],
			draftState = [],

	isOccupied = function(square){

	},

	isGoalSquare = function(square, color){

	},

	isSetupSquare = function(square, color){

	},

	isTrap = function(square){

	},

	getPiece = function(square){

	},

	updateDraftState = function(){
		//respond to interactions events to update piece positions
	},

	updateCurrentState = function(){
		//respond to rulesEngine events to update piece positions
	};

	return {
		
	};
}
