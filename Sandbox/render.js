if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
    alert('requires arimaa.js');
}

if (typeof(arimaa.renderer) === 'undefined') {
    arimaa.renderer = {};
}

arimaa.renderer = (function() {
	"use strict";

	var canvas = null,
			context = null,
			spriteProvider = null,
			board = null,
			styleSpec = {
				'colorBorder': '',
				'colorLine': '',
				'colorSquare': '',
				'colorSquareTrap': '#000000',
				'colorSquareSelected': 'rgba(0, 0, 200, 0.5)',
			},
			

	initialize = function(canvasDomNode, spriteImage){
		canvas = canvasDomNode;
		context = canvas.getContext("2d");
		spriteProvider = createSpriteProvider(spriteImage);
	},

	clearBoard = function (context){
		context.clearRect(board.x, board.y, board.width, board.height);
	},

	drawBoard = function (context){
		clearBoard(context);
		context.beginPath();

		//vertical lines
		for (var x = 0; x <= board.width; x += board.pieceSpec.width){
			context.moveTo(0.5 + x, 0);
			context.lineTo(0.5 + x, board.width);
		}

		//horizontal lines
		for (var y = 0; y <= board.height; y += board.pieceSpec.height){
			context.moveTo(0, 0.5 + y);
			context.lineTo(board.height, 0.5 + y);
		}

		//ink Paths
		context.strokeStyle = styleSpec.colorLine;
    context.stroke();

		//trap squares
		for(var t = 0; t < board.traps.length; t++){
			var trap = board.traps[t];
			colorSquare(trap, styleSpec.colorSquareTrap);
		}
	},

	colorSquare = function(square, hexColor){
		var startX = (board.pieceSpec.width * square.column) + 0.5,
				startY = (board.pieceSpec.height * square.row) + 0.5;
		
		context.fillStyle = hexColor;
		context.fillRect(startX, startY, board.pieceSpec.width, board.pieceSpec.height);
	},

	createSpriteProvider = function(image){
		return {
			"image": image,
			"gold": {
				"elephant": defineSprite(3, 151, 46, 46),
				"camel": defineSprite(51, 3, 47, 47),
				"horse": defineSprite(50, 202, 47, 46),
				"dog": defineSprite(51, 103, 46, 46),
				"cat": defineSprite(3, 51, 46, 46),
				"rabbit": defineSprite(2, 250, 46, 46)
			},
			"silver": {				
				"elephant": defineSprite(100, 151, 46, 46),
				"camel": defineSprite(148, 3, 47, 47),
				"horse": defineSprite(147, 202, 47, 46),
				"dog": defineSprite(148, 103, 46, 46),
				"cat": defineSprite(100, 51, 46, 46),
				"rabbit": defineSprite(99, 250, 46, 46)
			},
			getSprite: function(color, name){
				return this[color][name];
			}
		};
	},

	defineSprite = function(x, y, width, height){
		return {
			"x": x,
			"y": y,
			"width": width,
			"height": height
		};
	},

	drawSprite = function (color, name, x, y){
		var sprite = spriteProvider.getSprite(color, name);
		context.drawImage(spriteProvider.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
	},

	highlightSquare = function(square){
		colorSquare(square, styleSpec.colorSquareSelected);
	},

	render = function (boardSpec){
		if(typeof(boardSpec) == "undefined" || boardSpec === null){
			arimaa.log("board is not defined.");
			return;
		}

		board = boardSpec;

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
		initialize: initialize,
		render: render,
		highlightSquare: highlightSquare
	};

}());