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
			currentState = [],
			draftState = [],

	BoardSquare = function(column, row, isTrap, goalColor, setupColor){
		return {
			"column": column,
			"row": row,
			"isTrap": isTrap,
			"goalColor": goalColor,
			"setupColor": setupColor,
			"piece": null
		};
	},

	createBoardModel = function(boardSpec){
		var boardSquares = [];
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
			"squares": boardSquares
		};
	},

	hasEnded = function(){
		return false;
	},

	isOccupied = function(boardSquare){
		return square.piece !== null;
	},

	isGoalSquare = function(boardSquare, color){

	},

	isSetupSquare = function(boardSquare, color){

	},

	isTrap = function(boardSquare){
		boardSquare.isTrap;
	},

	getPiece = function(boardSquare){
		return boardSquare.piece;
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
		silver: silver
	};
}
