//take raw input and handle the overall action for a team, whether setup or movement
//delegate to rulesEngine the validation of the action based on gameState
//delegate to interactions the notification of the user or collection of input

if (typeof(arimaa) === 'undefined') {
    alert('requires arimaa.js');
}

if (typeof(arimaa.action) === 'undefined') {
    arimaa.action = {};
}

arimaa.action = function(ruleEngine) {
	"use strict";

	var isSetup = true,
			currentTeam = 'gold',
			moveCount = 0,
			rules = ruleEngine,

	movePiece = function(piece, square){
		/*if (team !== currentTeam){
			arimaa.events.error.emit('arimaa::action::movePiece: Current Team is ' + currentTeam + ' but move recieved was from ' + team)
			return;
		}*/
		var result = false;
		if (isSetup){
			result = rules.setPiece(currentTeam, piece, square);
			arimaa.events.setup.emit( piece, square);
			return result;
		}
		if (moveCount === 4){
			error('An attempt was made to make more than 4 moves.');
			return false;
		}
		moveCount++;
		result = rules.movePiece(currentTeam, piece, square);
		arimaa.events.move.emit(piece, square);
		return result;
	},

	beginTurn = function(){
		moveCount = 0;
		//arimaa.beginTurn.emit({"currentTeam": currentTeam});
	},

	endTurn = function(){
		//TODO: Validate current board state and see if anyone won
		switchTeam();
	},

	switchTeam = function(){
		if(currentTeam === 'gold'){
			currentTeam = 'silver';
			return;
		}
		currentTeam = 'gold';
	},

	subscribe = function(){
		arimaa.events.movePiece.on(movePiece);
		arimaa.events.beginTurn.on(beginTurn);
		arimaa.events.endTurn.on(endTurn);
	},

	error = function(functionName, message){
		arimaa.error('arimaa::action::' + functionName + ': ' + message);
	};

	subscribe();

	return {
	};
};