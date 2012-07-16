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
			piece = null,

	initialize = function(canvasDomNode, boardSpecification){
		canvas = canvasDomNode;
		board = boardSpecification;
		piece = board.piece;
		canvas.addEventListener("click", boardOnClick, false);
	},

	findSquare = function(canvasX, canvasY){
		var x = Math.min(canvasX, board.width * piece.width),
    		y = Math.min(canvasY, board.height * piece.height);
    return new board.Square(Math.floor(y/piece.height), Math.floor(x/piece.width));
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