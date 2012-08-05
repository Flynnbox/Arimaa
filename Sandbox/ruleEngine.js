//emit "piece captured" event
//emit "piece frozen" event, or just calc when try to select piece
//emit "piece unfrozen" event, or just calc when try to select piece
//hierarchy of pieces

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(arimaa.rules) === 'undefined') {
    arimaa.rules = {};
}

arimaa.rules = function(gameState) {
	"use strict";

	var model = gameState,

	setPiece = function(teamColor, piece, square){
		if(!model.isSetupSquare(teamColor, square)){
			error('setPiece', 'The selected ' + square.toString() + ' is not a setup position for the ' + teamColor + ' team');
		}
		if(model.isOccupied(square)){
			error('setPiece', 'The selected ' + square.toString() + ' is already occupied');
		}
		model.setPiece(square, piece);
	},

	movePiece = function(teamColor, piece, square){
		model.setPiece(square, piece);
	},

	error = function(functionName, message){
		arimaa.error('arimaa::action::' + error.caller + ': ' + message);
	};

	return {
		setPiece: setPiece,
		movePiece: movePiece
	};
};