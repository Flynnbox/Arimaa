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

	initialize = function(canvasDomNode, spriteImage){
		canvas = canvasDomNode;
		context = canvas.getContext("2d");
		spriteProvider = createSpriteProvider(spriteImage);
	},

	clearBoard = function (context, board){
		context.clearRect(board.x, board.y, board.width, board.height);
	},

	drawBoard = function (context, board){
		clearBoard(context, board);
		context.beginPath();

		//vertical lines
		for (var x = 0; x <= board.width; x += board.piece.width){
			context.moveTo(0.5 + x, 0);
			context.lineTo(0.5 + x, board.width);
		}

		//horizontal lines
		for (var y = 0; y <= board.height; y += board.piece.height){
			context.moveTo(0, 0.5 + y);
			context.lineTo(board.height, 0.5 + y);
		}

		//trap squares
		for(var t = 0; t < board.traps.length; t++){
			var trap = board.traps[t],
					startX = (board.piece.width * trap.x) + 0.5,
					startY = (board.piece.height * trap.y) + 0.5;
			context.fillRect(startX, startY, board.piece.width, board.piece.height);
		}

		//ink Paths
    context.strokeStyle = "#ccc";
    context.stroke();
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
		//arimaa.log(sprite);
		context.drawImage(spriteProvider.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
	},

	render = function (board){
		if(typeof(board) == "undefined" || board === null){
			arimaa.log("board is not defined.");
			return;
		}

		drawBoard(context, board);

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
		clearBoard: clearBoard,
		drawBoard: drawBoard,
		createSpriteProvider: createSpriteProvider,
		defineSprite: defineSprite,
		drawSprite: drawSprite,
		render: render
	};

}());