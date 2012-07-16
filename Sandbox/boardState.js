if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
    alert('requires arimaa.js');
}

if (typeof(arimaa.boardState) === 'undefined') {
    arimaa.boardState = {};
}

arimaa.boardState = (function() {
	"use strict";

	var standardPlayingPiece = {"width": 50, "height": 50},
			board = null,

	Square = function (row, column) {
		this.row = row;
		this.column = column;
	},

	defineBoard = function(startX, startY, pieceTemplate){
		var columns = 8;
		var rows = 8;
		return {
			"x":startX, 
			"y":startY, 
			"piece": pieceTemplate,
			"width": 1 + (columns * pieceTemplate.width), 
			"height": 1 + (rows * pieceTemplate.height),
			"traps": [new Square(2, 2), new Square(2, 5), new Square(5, 2), new Square(5, 5)],
			"Square": Square
		};
	},

	board = defineBoard(0, 0, standardPlayingPiece);

	return {
		boardSpecification: board
	};
}());