//acts as a view for rendering the board onto a canvas dom node

if (typeof(arimaa) === 'undefined') {
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
			style = styleSpecification,
	
	clearBoard = function (context){
		context.clearRect(style.board.x, style.board.y, style.board.width, style.board.height);
	},

	drawBoard = function (context){
		clearBoard(context);
		context.beginPath();

		//vertical lines
		for (var x = 0; x <= style.board.width; x += style.piece.width){
			context.moveTo(0.5 + x, 0);
			context.lineTo(0.5 + x, style.board.height);
		}

		//horizontal lines
		for (var y = 0; y <= style.board.height; y += style.piece.height){
			context.moveTo(0, 0.5 + y);
			context.lineTo(style.board.width, 0.5 + y);
		}

		//ink Paths
		context.strokeStyle = style.board.lineColor;
    context.stroke();

		//trap squares
		for(var t = 0; t < board.traps.length; t++){
			var trap = board.traps[t];
			colorSquare(trap, style.board.trapSquareColor);
		}
	},

	colorSquare = function(square, color){
		var startX = (style.piece.width * square.column) + 1,
				startY = (style.piece.height * square.row) + 1;
		
		context.fillStyle = color;
		context.fillRect(startX, startY, style.piece.width - 1, style.piece.height - 1);
	},

	drawSprite = function (color, name, x, y){
		var sprite = spriteProvider.getSprite(color, name);
		context.drawImage(spriteProvider.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
	},

	highlightSquare = function(square){
		colorSquare(square, style.board.selectedSquareColor);
	},

	lowlightSquare = function(square){
		colorSquare(square, style.board.squareColor);
	},

	render = function (){
		//resize canvas to minimum render dimensions
		canvas.width = style.board.width;
		canvas.height = style.board.height;

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
		highlightSquare: highlightSquare,
		lowlightSquare: lowlightSquare
	};

};