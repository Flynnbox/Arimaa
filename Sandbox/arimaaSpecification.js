function defineBoard(columns, rows, playingPieceDimensions, trapSquares){
	return {
		"rows": rows,
		"columns": columns,
		"pieceSpec": playingPieceDimensions,
		"width": 1 + (columns * playingPieceDimensions.width), 
		"height": 1 + (rows * playingPieceDimensions.height),
		"traps": trapSquares
	};
}

function defineBoardStyle(boardSpecification, playingPieceDimensions){
	return {
		"width": 1 + (boardSpecification.columns * playingPieceDimensions.width), 
		"height": 1 + (boardSpecification.rows * playingPieceDimensions.height),
		'borderColor': '',
		'lineColor': '',
		'squareColor': '',
		'trapSquareColor': '#000000',
		'selectedSquareColor': 'rgba(0, 0, 200, 0.5)',
	};
}

function defineSprite(x, y, width, height){
	return {
		"x": x,
		"y": y,
		"width": width,
		"height": height
	};
}

function createSpriteProvider(image){
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
}

var arimaaPieceStyle = {"width": 50, "height": 50},
		arimaaBoardSpecification = defineBoard(8, 8, arimaaPieceStyle, [new Square(2, 2), new Square(5, 2), new Square(2, 5), new Square(5, 5)]),
		arimaaBoardStyle = defineBoardStyle(arimaaBoardSpecification, arimaaPieceStyle),
		arimaaBoard = arimaaBoardSpecification;
