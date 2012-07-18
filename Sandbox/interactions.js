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
			style = null,
			pieceSpec = null,

	initialize = function(canvasDomNode, styleSpecification){
		canvas = canvasDomNode;
		style = styleSpecification;
		pieceSpec = style.pieceSpec;
		canvas.addEventListener("click", boardOnClick, false);
	},

	findSquare = function(canvasX, canvasY){
		var x = Math.min(canvasX, style.width * pieceSpec.width),
    		y = Math.min(canvasY, style.height * pieceSpec.height);
    return new Square(Math.floor(x/pieceSpec.width), Math.floor(y/pieceSpec.height));
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