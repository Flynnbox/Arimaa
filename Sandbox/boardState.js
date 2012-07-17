function Square (row, column) {
	this.row = row;
	this.column = column;
};

function defineBoard(playingPieceDimensions){
	var columns = 8;
	var rows = 8;
	return {
		"rows": rows,
		"columns": columns,
		"pieceSpec": playingPieceDimensions,
		"width": 1 + (columns * playingPieceDimensions.width), 
		"height": 1 + (rows * playingPieceDimensions.height),
		"traps": [new Square(2, 2), new Square(2, 5), new Square(5, 2), new Square(5, 5)],
		"Square": Square
	};
};

var playingPieceDimensions = {"width": 50, "height": 50},
		arimaaBoard = defineBoard(playingPieceDimensions);

if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
    alert('requires arimaa.js');
}

if (typeof(arimaa.boardState) === 'undefined') {
    arimaa.boardState = {};
}

arimaa.boardState = (function(boardSpec) {
	"use strict";

	var board = boardSpec,
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
		boardSpecification: board
	};
}(arimaaBoard));
