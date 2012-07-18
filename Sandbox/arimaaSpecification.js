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

	definePiece = function(color, id, type){
		return {
			"id": color + ':' + type + ':' + id,
			"color": color,
			"type": type
		}
	},

	Elephant = function(color, id){
		return definePiece(color, id, 'elephant');
	},

	Camel = function(color, id){
		return definePiece(color, id, 'camel');
	},

	Horse = function(color, id){
		return definePiece(color, id, 'horse');
	},

	Dog = function(color, id){
		return definePiece(color, id, 'dog');
	},

	Cat = function(color, id){
		return definePiece(color, id, 'cat');
	},

	Rabbit = function(color, id){
		return definePiece(color, id, 'rabbit');
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

	defineBoard = function(columns, rows, trapSquares){
		var traps = trapSquares;
		if (typeof(traps) === 'undefined' || traps === null){
			traps = [];
		}
		return {
			"rows": rows,
			"columns": columns,
			"traps": traps,
			"goalRows": {"gold": 7, "silver": 0},
			"setupRows": {"gold": [6,7], "silver": [0,1]}
		};
	},

	defineBoardStyle = function(x, y, boardSpecification, playingPieceDimensions){
		return {
			"x": x,
			"y": y,
			"width": 1 + (boardSpecification.columns * playingPieceDimensions.width), 
			"height": 1 + (boardSpecification.rows * playingPieceDimensions.height),
			'borderColor': '',
			'lineColor': '',
			'squareColor': '',
			'trapSquareColor': '#000000',
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
	}

	return {
		defineBoard: defineBoard,
		defineBoardStyle: defineBoardStyle,
		definePieceStyle: definePieceStyle,
		defineGameStyle: defineGameStyle,
		defineSprite: defineSprite,
		createSpriteProvider: createSpriteProvider
	}
};