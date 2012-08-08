module( "gameState" );

var arimaaSpec = null,
		goalRowGold = 4,
		goalRowSilver = 0,
		setupRowsGold = [3,4],
		setupRowsSilver = [0,1],
		trapSquares = [new Square(0, 2), new Square(1, 2)];

function setup(){
	arimaaSpec = new arimaa.specification();
}

function getBoardSpec(){	
	return arimaaSpec.defineBoard(2, 5, trapSquares, arimaaSpec.defineGoalRows(goalRowGold, goalRowSilver), arimaaSpec.defineSetupRows(setupRowsGold, setupRowsSilver));
}

QUnit.moduleStart(setup);

//QUnit.testStart();

test( 'verify construction succeeds', function() {
	var gameState = new arimaa.boardState(getBoardSpec());
	notStrictEqual( typeof(gameState), 'undefined', 'newly created game state is undefined');
	notStrictEqual( gameState, null, 'gameState is null');
});

test( 'verify game is not ended on construction', function() {
	var gameState = new arimaa.boardState(getBoardSpec());
	strictEqual(gameState.hasEnded(), false, 'newly created game state has ended');
});

test( 'verify game board has no pieces on construction', function() {
	var gameState = new arimaa.boardState(getBoardSpec());
	strictEqual(_.all(gameState.board, function(element){ return element.piece == null;}), true, 'newly created game board has pieces');
});

test( 'verify game board goal squares for gold are specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var goalSquares = arimaaSpec.getSquaresForRow(boardSpec, goalRowGold);
	strictEqual(_.all(goalSquares, function(element){ return gameState.isGoal(element, 'gold');}), true, 'invalid goal squares for gold');
});

test( 'verify game board goal squares for silver are specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var goalSquares = arimaaSpec.getSquaresForRow(boardSpec, goalRowSilver);
	strictEqual(_.all(goalSquares, function(element){ return gameState.isGoal(element, 'silver');}), true, 'invalid goal squares for silver');
});

test( 'verify game board setup squares for gold are specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var setupSquares = arimaaSpec.getSquaresForRow(boardSpec, setupRowsGold);
	strictEqual(_.all(setupSquares, function(element){ return gameState.isSetup(element, 'gold');}), true, 'invalid goal squares for gold');
});

test( 'verify game board setup squares for silver are specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var setupSquares = arimaaSpec.getSquaresForRow(boardSpec, setupRowsSilver);
	strictEqual(_.all(setupSquares, function(element){ return gameState.isSetup(element, 'silver');}), true, 'invalid goal squares for silver');
});

test( 'verify game board trap squares are specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	strictEqual(_.all(trapSquares, function(element){ return gameState.isTrap(element);}), true, 'invalid trap squares');
});

test( 'verify can setup pieces', function() {
	var boardSpec = getBoardSpec();
	var goldTeam = new arimaaSpec.Team('gold');
	var gameState = new arimaa.boardState(boardSpec, goldTeam);
	var piece = gameState.gold.pieces[0]; 
	var toSquare = arimaaSpec.getSquaresForRow(boardSpec, setupRowsGold)[0];
	var arimaaRules = new arimaa.rules(gameState);
	var arimaaAction = new arimaa.action(arimaaRules);

	arimaa.trigger('arimaa.movePiece', piece, toSquare);

	strictEqual(piece, gameState.getPiece(toSquare), 'piece was not setup');
});

test( 'verify setup of piece on existing location replaces piece', function() {
	var boardSpec = getBoardSpec();
	var goldTeam = new arimaaSpec.Team('gold');
	var gameState = new arimaa.boardState(boardSpec, goldTeam);
	var piece1 = gameState.gold.pieces[0];
	var piece2 = gameState.gold.pieces[1]; 
	var toSquare = arimaaSpec.getSquaresForRow(boardSpec, setupRowsGold)[0];
	var arimaaRules = new arimaa.rules(gameState);
	var arimaaAction = new arimaa.action(arimaaRules);
	arimaa.debug(gameState.isOccupied(toSquare));
	arimaa.trigger('arimaa.movePiece', piece1, toSquare);
	arimaa.trigger('arimaa.movePiece', piece2, toSquare);

	strictEqual(piece2, gameState.getPiece(toSquare), 'piece was not replaced');
});

/*
test( 'description', function() {
	var boardState = new arimaa.boardState(getBoardSpec());
	strictEqual('actual', 'expected', 'defaultFailureMessage');
	//deepEqual('actual', 'expected', 'defaultFailureMessage');
	//ok(truthy, 'defaultFailureMessage');
});
*/