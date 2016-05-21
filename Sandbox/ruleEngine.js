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
		if(!model.isSetup(square, teamColor)){
			error('setPiece', 'The selected ' + square.toString() + ' is not a setup position for the ' + teamColor + ' team');
			return false;
		}
		if(model.isOccupied(square)){
			model.removePiece(square);
		}
		model.setPiece(square, piece);
		return true;
	},

	movePiece = function(teamColor, piece, square){
		model.setPiece(square, piece);
		return true;
	},

	error = function(functionName, message){
		arimaa.error('arimaa::action::' + functionName + ': ' + message);
	};

	return {
		setPiece: setPiece,
		movePiece: movePiece
	};
};