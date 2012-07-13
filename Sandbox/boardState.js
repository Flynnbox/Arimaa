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

	defineBoard = function(startX, startY, pieceTemplate){
		var columns = 8;
		var rows = 8;
		return {
			"x":startX, 
			"y":startY, 
			"piece": pieceTemplate,
			"width": 1 + (columns * pieceTemplate.width), 
			"height": 1 + (rows * pieceTemplate.height),
			"traps": [{"x": 2, "y": 2}, {"x": 2, "y": 5}, {"x": 5, "y": 2}, {"x": 5, "y": 5}]
		};
	};

	board = defineBoard(0, 0, standardPlayingPiece);

	return {
		boardSpecification: board,
		pieceSpecification: standardPlayingPiece
	};
}());