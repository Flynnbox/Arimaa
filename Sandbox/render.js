if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
    alert('requires arimaa.js');
}

if (typeof(arimaa.canvasRenderer) === 'undefined') {
    arimaa.renderer = {};
}

arimaa.canvasRenderer = function(canvasDomNode, spriteSpecification, boardSpecification, styleSpecification) {
	"use strict";

	var canvas = canvasDomNode,
			context = canvas.getContext("2d"),
			spriteProvider = spriteSpecification,
			board = boardSpecification,
			styleSpec = styleSpecification,
	
	clearBoard = function (context){
		context.clearRect(styleSpec.x, styleSpec.y, styleSpec.width, styleSpec.height);
	},

	drawBoard = function (context){
		clearBoard(context);
		context.beginPath();

		//vertical lines
		for (var x = 0; x <= styleSpec.width; x += styleSpec.pieceSpec.width){
			context.moveTo(0.5 + x, 0);
			context.lineTo(0.5 + x, styleSpec.width);
		}

		//horizontal lines
		for (var y = 0; y <= styleSpec.height; y += styleSpec.pieceSpec.height){
			context.moveTo(0, 0.5 + y);
			context.lineTo(styleSpec.height, 0.5 + y);
		}

		//ink Paths
		context.strokeStyle = styleSpec.lineColor;
    context.stroke();

		//trap squares
		for(var t = 0; t < board.traps.length; t++){
			var trap = board.traps[t];
			colorSquare(trap, styleSpec.trapSquareColor);
		}
	},

	colorSquare = function(square, hexColor){
		var startX = (styleSpec.pieceSpec.width * square.column) + 0.5,
				startY = (styleSpec.pieceSpec.height * square.row) + 0.5;
		
		context.fillStyle = hexColor;
		context.fillRect(startX, startY, styleSpec.pieceSpec.width, styleSpec.pieceSpec.height);
	},

	drawSprite = function (color, name, x, y){
		var sprite = spriteProvider.getSprite(color, name);
		context.drawImage(spriteProvider.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
	},

	highlightSquare = function(square){
		colorSquare(square, styleSpec.selectedSquareColor);
	},

	render = function (){
		drawBoard(context);

		//draw gold sprites
		drawSprite("gold", "elephant", 2.5, 2.5);
		drawSprite("gold", "camel", 52.5, 2.5);
		drawSprite("gold", "horse", 102.5, 2.5);
		drawSprite("gold", "dog", 152.5, 2.5);
		drawSprite("gold", "cat", 202.5, 2.5);
		drawSprite("gold", "rabbit", 252.5, 2.5);

		//draw silver sprites
		drawSprite("silver", "elephant", 2.5, 52.5);
		drawSprite("silver", "camel", 52.5, 52.5);
		drawSprite("silver", "horse", 102.5, 52.5);
		drawSprite("silver", "dog", 152.5, 52.5);
		drawSprite("silver", "cat", 202.5, 52.5);
		drawSprite("silver", "rabbit", 252.5, 52.5);
	};

	return {
		render: render,
		highlightSquare: highlightSquare
	};

};