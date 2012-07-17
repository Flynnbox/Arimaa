var playingPieceDimensions = {"width": 50, "height": 50},
		arimaaBoard = {
			"rows": 8,
			"columns": 8,
			"pieceSpec": playingPieceDimensions,
			"width": 1 + (8 * playingPieceDimensions.width), 
			"height": 1 + (8 * playingPieceDimensions.height),
			"traps": [new Square(2, 2), new Square(2, 5), new Square(5, 2), new Square(5, 5)],
			"Square": Square
		};