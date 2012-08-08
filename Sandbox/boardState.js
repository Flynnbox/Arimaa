//represents the Model of the current state of the board and all pieces

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(arimaa.boardState) === 'undefined') {
    arimaa.boardState = {};
}

arimaa.boardState = function(newBoard, goldTeam, silverTeam) {
	"use strict";

	var board = null,
			gold = goldTeam,
			silver = silverTeam,
			moveLog = [],
			setupPieces = [],
			capturedPieces = [],
			currentState = [],
			draftState = [],

	BoardSquare = function(column, row, isTrap, goalColor, setupColor){

		var toString = function(){
			var temp = [];
			temp.push("boardSquare::");			
			temp.push(" id:");
			temp.push(this.id);
			temp.push(" isTrap:");
			temp.push(this.isTrap);
			temp.push(" goalColor:");
			temp.push(this.goalColor);
			temp.push(" setupColor:");
			temp.push(this.setupColor);
			temp.push(" piece:");
			temp.push(this.piece !== null ? this.piece.id : "none");
			return temp.join("");
		};

		return {
			"column": column,
			"row": row,
			"isTrap": isTrap,
			"goalColor": goalColor,
			"setupColor": setupColor,
			"piece": null,			
			"id": "col " + column + " row " + row,
			"toString": toString
		};
	},

	createBoardModel = function(boardSpec){

		var boardSquares = [],

		toString = function(){
			var temp = [];
			temp.push("board::")
			for(var x = 0; x < boardSquares.length; x++){
				temp.push("\n\t");
				temp.push(boardSquares[x].toString());
			}
			return temp.join("");
		};

		for(var x = 0; x < boardSpec.columns; x++){
			for(var y = 0; y < boardSpec.rows; y++){
				var isTrap = false,
						goalColor = null,
						setupColor = null;
				if (_.any(boardSpec.traps, function(element){ return element.column === x && element.row === y;})){
					isTrap = true;
				}
				if(boardSpec.goalRows.gold == y){
					goalColor = "gold";
				}
				if(boardSpec.goalRows.silver == y){
					goalColor = "silver";
				}
				if(_.any(boardSpec.setupRows.gold, function(element){ return element === y;})){
					setupColor = "gold";
				}
				if(_.any(boardSpec.setupRows.silver, function(element){ return element === y;})){
					setupColor = "silver";
				}
				boardSquares.push(new BoardSquare(x, y, isTrap, goalColor, setupColor));
			}
		}
		return {
			"squares": boardSquares,
			"toString": toString
		};
	},

	hasEnded = function(){
		return false;
	},

	isOccupied = function(square){
		var boardSquare = getBoardSquare(square);
		return boardSquare.piece !== null;
	},

	isGoalSquare = function(square, color){
		var boardSquare = getBoardSquare(square);
		return boardSquare.goalColor === color;
	},

	isSetupSquare = function(square, color){
		var boardSquare = getBoardSquare(square);
		return boardSquare.setupColor === color;
	},

	isTrapSquare = function(square){
		var boardSquare = getBoardSquare(square);
		return boardSquare.isTrap;
	},

	getBoardSquare = function(square){
		var boardSquare = _.find(board.squares, function(element){ return element.column === square.column && element.row === square.row;});
		return boardSquare;
	},

	getPiece = function(square){
		var boardSquare = getBoardSquare(square);
		return boardSquare.piece;
	},

	setPiece = function(square, piece){
		var boardSquare = getBoardSquare(square);
		if (boardSquare.piece === null){
			boardSquare.piece = piece;
			return;
		}
		arimaa.log("boardState::setPiece:: Cannot set " + piece.id + " on position " + boardSquare.id + "; " + boardSquare.piece.id + " is currently occupying that position.")
	},

	removePiece = function(square){
		var boardSquare = getBoardSquare(square);
		if(boardSquare.piece === null){
			arimaa.log("boardState::removePiece:: Cannot remove a piece from position " + boardSquare.id + " as no piece is currently occupying it.")
		}
		boardSquare.piece == null;
	},

	updateDraftState = function(){
		//respond to rulesEngine events to update piece positions
	},

	updateCurrentState = function(){
		//respond to rulesEngine events to update piece positions
	},

	board = createBoardModel(newBoard);

	return {
		//hasBegun: hasBegun,
		hasEnded: hasEnded,
		//winner: winner
		board: board,
		gold: gold,
		silver: silver,
		isGoal: isGoalSquare,
		isSetup: isSetupSquare,
		isTrap: isTrapSquare,
		isOccupied: isOccupied,
		getPiece: getPiece,
		setPiece: setPiece,
		removePiece: removePiece
	};
};
