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

var arimaaPieceStyle = {"width": 50, "height": 50},
		arimaaBoardSpecification = defineBoard(8, 8, arimaaPieceStyle, [new Square(2, 2), new Square(5, 2), new Square(2, 5), new Square(5, 5)]),
		arimaaBoardStyle = defineBoardStyle(arimaaBoardSpecification, arimaaPieceStyle),
		arimaaBoard = arimaaBoardSpecification;
