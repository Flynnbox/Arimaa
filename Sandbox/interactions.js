//acts as a weak controller to throw events based on ui actions

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(arimaa.interactions) === 'undefined') {
    arimaa.interactions = {};
}

arimaa.interactions = (function() {
	"use strict";

	var canvas = null,
			style = null,
			selectedSquare = null,

	initialize = function(canvasDomNode, styleSpecification){
		canvas = canvasDomNode;
		style = styleSpecification;
		canvas.addEventListener("click", boardOnClick, false);
	},

	findSquare = function(canvasX, canvasY){
		var x = Math.min(canvasX, style.board.width * style.piece.width),
    		y = Math.min(canvasY, style.board.height * style.piece.height);
    return new Square(Math.floor(x/style.piece.width), Math.floor(y/style.piece.height));
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
    var newSquare = getCursorPosition(e);
    if (selectedSquare !== null){ 	
    	arimaa.trigger('squareDeselected', selectedSquare);
    	if (selectedSquare.isEqual(newSquare)){    	
    		selectedSquare = null;
    		return;
    	}
    }
  	selectedSquare = newSquare;
  	arimaa.trigger('squareSelected', selectedSquare);
	};

	return{
		initialize: initialize
	};
}());