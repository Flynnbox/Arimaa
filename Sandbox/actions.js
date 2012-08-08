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
			arimaa.trigger('arimaa.error', 'arimaa::action::movePiece: Current Team is ' + currentTeam + ' but move recieved was from ' + team)
			return;
		}*/

		if (isSetup){
			rules.setPiece(currentTeam, piece, square);
			arimaa.trigger('arimaa.setup', piece, square);
			return;
		}
		if (moveCount === 4){
			error('An attempt was made to make more than 4 moves.');
			return;
		}
		moveCount++;
		rules.movePiece(currentTeam, piece, square);
		arimaa.trigger('arimaa.move', piece, square);
	},

	beginTurn = function(){
		moveCount = 0;
		//arimaa.trigger('arimaa.beginTurn', {"currentTeam": currentTeam});
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
		arimaa.on('arimaa.movePiece', movePiece);
		arimaa.on('arimaa.beginTurn', beginTurn);
		arimaa.on('arimaa.endTurn', endTurn);
	},

	error = function(functionName, message){
		arimaa.error('arimaa::action::' + functionName + ': ' + message);
	};

	subscribe();

	return {
	};
};