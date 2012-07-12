	function clearBoard(context, board){
		context.clearRect(board.x, board.y, board.width, board.height)
	}

	function drawBoard(context, board){
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
	}

	function loadImage(imageFilePath, success){
		var img = new Image();
		img.onload = function(){
				if(success !== null) {
					success(img);
				}
			};
		img.src = imageFilePath;
	}

	function drawSprite(color, name, x, y){
		var sprite = spriteProvider.getSprite(color, name);
		console.log(sprite);
		context.drawImage(spriteProvider.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
	}

	function render(){
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
	}