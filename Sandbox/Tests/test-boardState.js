var arimaaSpec = null,
		goalRowGold = 4,
		goalRowSilver = 0,
		setupRowsGold = [3,4],
		setupRowsSilver = [0,1],
		trapSquares = [new Square(0, 2), new Square(1, 2)];

function getBoardSpec(){	
	return arimaaSpec.defineBoard(2, 5, trapSquares, arimaaSpec.defineGoalRows(goalRowGold, goalRowSilver), arimaaSpec.defineSetupRows(setupRowsGold, setupRowsSilver));
}

QUnit.module( "gameState", {
    beforeEach: function( assert ) {
    	arimaaSpec = new arimaa.specification();
    },
    afterEach: function( assert ) {
    }
});

QUnit.test( 'verify construction succeeds', function(assert) {
	var gameState = new arimaa.boardState(getBoardSpec());
	assert.notStrictEqual( typeof(gameState), 'undefined', 'newly created game state is undefined');
	assert.notStrictEqual( gameState, null, 'gameState is null');
});

QUnit.test( 'verify game is not ended on construction', function(assert) {
	var gameState = new arimaa.boardState(getBoardSpec());
	assert.strictEqual(gameState.hasEnded(), false, 'newly created game state has ended');
});

QUnit.test( 'verify game board has no pieces on construction', function(assert) {
	var gameState = new arimaa.boardState(getBoardSpec());
	assert.strictEqual(_.all(gameState.board, function(element){ return element.piece == null;}), true, 'newly created game board has pieces');
});

QUnit.test( 'verify game board goal squares for gold are specified', function(assert) {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var goalSquares = arimaaSpec.getSquaresForRow(boardSpec, goalRowGold);
	assert.strictEqual(_.all(goalSquares, function(element){ return gameState.isGoal(element, 'gold');}), true, 'invalid goal squares for gold');
});

QUnit.test( 'verify game board goal squares for silver are specified', function(assert) {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var goalSquares = arimaaSpec.getSquaresForRow(boardSpec, goalRowSilver);
	assert.strictEqual(_.all(goalSquares, function(element){ return gameState.isGoal(element, 'silver');}), true, 'invalid goal squares for silver');
});

QUnit.test( 'verify game board setup squares for gold are specified', function(assert) {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var setupSquares = arimaaSpec.getSquaresForRow(boardSpec, setupRowsGold);
	assert.strictEqual(_.all(setupSquares, function(element){ return gameState.isSetup(element, 'gold');}), true, 'invalid goal squares for gold');
});

QUnit.test( 'verify game board setup squares for silver are specified', function(assert) {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var setupSquares = arimaaSpec.getSquaresForRow(boardSpec, setupRowsSilver);
	assert.strictEqual(_.all(setupSquares, function(element){ return gameState.isSetup(element, 'silver');}), true, 'invalid goal squares for silver');
});

QUnit.test( 'verify game board trap squares are specified', function(assert) {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	assert.strictEqual(_.all(trapSquares, function(element){ return gameState.isTrap(element);}), true, 'invalid trap squares');
});

QUnit.test( 'verify can setup pieces', function(assert) {
	var boardSpec = getBoardSpec();
	var goldTeam = new arimaaSpec.Team('gold');
	var gameState = new arimaa.boardState(boardSpec, goldTeam);
	var piece = gameState.gold.pieces[0]; 
	var toSquare = arimaaSpec.getSquaresForRow(boardSpec, setupRowsGold)[0];
	var arimaaRules = new arimaa.rules(gameState);
	var arimaaAction = new arimaa.action(arimaaRules);

	arimaa.events.movePiece.emit(piece, toSquare);

	assert.strictEqual(piece, gameState.getPiece(toSquare), 'piece was not setup');
});

QUnit.test( 'verify setup of piece on existing location replaces piece', function(assert) {
	var boardSpec = getBoardSpec();
	var goldTeam = new arimaaSpec.Team('gold');
	var gameState = new arimaa.boardState(boardSpec, goldTeam);
	var piece1 = gameState.gold.pieces[0];
	var piece2 = gameState.gold.pieces[1]; 
	var toSquare = arimaaSpec.getSquaresForRow(boardSpec, setupRowsGold)[0];
	var arimaaRules = new arimaa.rules(gameState);
	var arimaaAction = new arimaa.action(arimaaRules);
	arimaa.events.movePiece.emit(piece1, toSquare);
	arimaa.events.movePiece.emit(piece2, toSquare);

	assert.strictEqual(piece2, gameState.getPiece(toSquare), 'piece was not replaced');
});

QUnit.test( 'verify setup of piece on non-setup location fails', function(assert) {
	var boardSpec = getBoardSpec();
	var goldTeam = new arimaaSpec.Team('gold');
	var gameState = new arimaa.boardState(boardSpec, goldTeam);
	var piece1 = gameState.gold.pieces[0];
	var toSquare = trapSquares[0];
	var arimaaRules = new arimaa.rules(gameState);
	var arimaaAction = new arimaa.action(arimaaRules);
	arimaa.events.movePiece.emit(piece1, toSquare);

	assert.strictEqual(null, gameState.getPiece(toSquare), 'piece was not placed');
});

/*
QUnit.test( 'description', function(assert) {
	var boardState = new arimaa.boardState(getBoardSpec());
	assert.strictEqual('actual', 'expected', 'defaultFailureMessage');
	//assert.deepEqual('actual', 'expected', 'defaultFailureMessage');
	//assert.ok(truthy, 'defaultFailureMessage');
});
*/