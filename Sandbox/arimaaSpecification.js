//represents configuration objects used by other modules

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(arimaa.specification) === 'undefined') {
    arimaa.specification = {};
}

arimaa.specification = function(){
	"use strict";

	var

	Piece = function(color, id, type){
		this.id = color + ':' + type + ':' + id;
		this.color = color;
		this.type = type;

		this.isOfTeam = function(teamColor){
			return this.color === teamColor;
		};

		this.isEqual = function(piece){
			return typeof(piece) !== 'undefined' && piece !== null && piece.id === this.id;
		};

		this.toString = function(){
			return "piece:: id:" + this.id;
		};
	},

	Elephant = function(color, id){
		return new Piece(color, id, 'elephant');
	},

	Camel = function(color, id){
		return new Piece(color, id, 'camel');
	},

	Horse = function(color, id){
		return new Piece(color, id, 'horse');
	},

	Dog = function(color, id){
		return new Piece(color, id, 'dog');
	},

	Cat = function(color, id){
		return new Piece(color, id, 'cat');
	},

	Rabbit = function(color, id){
		return new Piece(color, id, 'rabbit');
	},

	Team = function(teamColor, startingPieces){
		var color = teamColor,
				id = 0,
				pieces = startingPieces;

		if(typeof(pieces) === 'undefined' || pieces === null){
			pieces = [];
			pieces.push(new Elephant(color, id++));
			pieces.push(new Camel(color, id++));
			pieces.push(new Horse(color, id++));
			pieces.push(new Horse(color, id++));
			pieces.push(new Dog(color, id++));
			pieces.push(new Dog(color, id++));
			pieces.push(new Cat(color, id++));
			pieces.push(new Cat(color, id++));
			pieces.push(new Rabbit(color, id++));
			pieces.push(new Rabbit(color, id++));
			pieces.push(new Rabbit(color, id++));
			pieces.push(new Rabbit(color, id++));
			pieces.push(new Rabbit(color, id++));			
			pieces.push(new Rabbit(color, id++));
		}

		return {
			color: color,
			pieces: pieces
		}
	},

	defineBoard = function(columns, rows, trapSquares, goalRows, setupRows){
		//set smart default values for standard arimaa board
		if (typeof(columns) === 'undefined' || columns === null){
			columns = 8;
		}
		if (typeof(rows) === 'undefined' || rows === null){
			rows = 8;
		}
		if (typeof(trapSquares) === 'undefined' || trapSquares === null){
			if (rows = 8){
				trapSquares = [new Square(2, 2), new Square(5, 2), new Square(2, 5), new Square(5, 5)];
			} else {				
				trapSquares = [];
			}
		}
		if (typeof(goalRows) === 'undefined' || goalRows === null){
			if (rows = 8){
				goalRows = {"gold": 7, "silver": 0};
			} else {
				goalRows = {"gold": null, "silver": null};
			}
		}
		if (typeof(setupRows) === 'undefined' || setupRows === null){
			if (rows = 8){
				setupRows = {"gold": [6,7], "silver": [0,1]};
			} else {
				setupRows = {"gold": [], "silver": []};
			}
		}
		return {
			"rows": rows,
			"columns": columns,
			"traps": trapSquares,
			"goalRows": goalRows,
			"setupRows": setupRows
		};
	},

	defineGoalRows = function(goldRow, silverRow){
		return {"gold": goldRow, "silver": silverRow}
	},

	defineSetupRows = function(goldRows, silverRows){
		return {"gold": goldRows, "silver": silverRows}
	},

	defineBoardStyle = function(x, y, boardSpecification, playingPieceDimensions){
		return {
			"x": x,
			"y": y,
			"width": 1 + (boardSpecification.columns * playingPieceDimensions.width), 
			"height": 1 + (boardSpecification.rows * playingPieceDimensions.height),
			'borderColor': '',
			'lineColor': '',
			'squareColor': 'rgba(255, 255, 255, 1)',
			'trapSquareColor': 'rgba(0, 0, 0, 1)',
			'selectedSquareColor': 'rgba(0, 0, 200, 0.5)'
		};
	},

	definePieceStyle = function(width, height){
		return {
			"width": width, 
			"height": height
		}
	},

	defineGameStyle = function(boardStyle, pieceStyle){
		return {
			"board": boardStyle,
			"piece": pieceStyle
		}
	},

	defineSprite = function(x, y, width, height){
		return {
			"x": x,
			"y": y,
			"width": width,
			"height": height
		};
	},

	//TODO: replace hardcode sprite dimensions with parameter values
	createSpriteProvider = function (image, goldSpriteDefinitions, silverSpriteDefinitions){
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
			getSprite: function(color, pieceName){
				if (!this.hasOwnProperty(color)){
					throw "specification::createSpriteProvider::getSprite:: Unrecognized color: " + color;
				}
				if (!this[color].hasOwnProperty(pieceName)){
					throw "specification::createSpriteProvider::getSprite:: Unrecognized piece name: " + pieceName;
				}
				return this[color][pieceName];
			}
		};
	},

	getSquaresForRow = function(board, rows){
		var squares = [];
		if( Object.prototype.toString.call( rows ) !== '[object Array]' ) {
			var temp = rows;
			rows = [];
			rows.push(temp);
		};

		for(var y = 0; y < rows.length; y++){
			for(var x = 0; x < board.columns; x++){
				squares.push(new Square(x, rows[y]));
			}
		}
		return squares;
	};

	return {
		defineGoalRows: defineGoalRows,
		defineSetupRows: defineSetupRows,
		defineBoard: defineBoard,
		defineBoardStyle: defineBoardStyle,
		definePieceStyle: definePieceStyle,
		defineGameStyle: defineGameStyle,
		defineSprite: defineSprite,
		createSpriteProvider: createSpriteProvider,
		getSquaresForRow: getSquaresForRow,
		Piece: Piece,
		Team: Team
	};
};