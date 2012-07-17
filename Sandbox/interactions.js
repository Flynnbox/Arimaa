if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
    alert('requires arimaa.js');
}

if (typeof(arimaa.interactions) === 'undefined') {
    arimaa.interactions = {};
}

arimaa.interactions = (function() {
	"use strict";

	var canvas = null,
			board = null,
			pieceSpec = null,

	initialize = function(canvasDomNode, boardSpecification){
		canvas = canvasDomNode;
		board = boardSpecification;
		pieceSpec = board.pieceSpec;
		canvas.addEventListener("click", boardOnClick, false);
	},

	findSquare = function(canvasX, canvasY){
		var x = Math.min(canvasX, board.width * pieceSpec.width),
    		y = Math.min(canvasY, board.height * pieceSpec.height);
    return new board.Square(Math.floor(y/pieceSpec.height), Math.floor(x/pieceSpec.width));
	},

	getCursorPosition = function (e) {
    /* returns Square with .row and .column properties */
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
			x = e.pageX;
			y = e.pageY;
    }
    else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    return findSquare(x, y);
	},

	boardOnClick = function(e) {
    var square = getCursorPosition(e);	    
    arimaa.trigger('boardClick', square);
	};

	return{
		initialize: initialize
	};
}());