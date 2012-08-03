module( "gameState" );

var arimaaSpec = null;

function setup(){
	arimaaSpec = new arimaa.specification();
}

function getBoardSpec(){	
	return arimaaSpec.defineBoard(2, 4, [new Square(1, 1)], arimaaSpec.defineGoalRows(3, 0), arimaaSpec.defineSetupRows([2,3], [0,1]));
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

test( 'verify game board goal squares for gold are rows specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var goalSquares = arimaaSpec.getSquaresForRow(boardSpec, 3);
	strictEqual(_.all(goalSquares, function(element){ return gameState.isGoalSquare(element, 'gold');}), true, 'invalid goal squares for gold');
});

test( 'verify game board goal squares for silver are rows specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var goalSquares = arimaaSpec.getSquaresForRow(boardSpec, 0);
	strictEqual(_.all(goalSquares, function(element){ return gameState.isGoalSquare(element, 'silver');}), true, 'invalid goal squares for silver');
});

test( 'verify game board setup squares for gold are rows specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var setupSquares = arimaaSpec.getSquaresForRow(boardSpec, [2, 3]);
	strictEqual(_.all(setupSquares, function(element){ return gameState.isSetupSquare(element, 'gold');}), true, 'invalid goal squares for gold');
});

test( 'verify game board setup squares for silver are rows specified', function() {
	var boardSpec = getBoardSpec();
	var gameState = new arimaa.boardState(boardSpec);
	var setupSquares = arimaaSpec.getSquaresForRow(boardSpec, [0, 1]);
	strictEqual(_.all(setupSquares, function(element){ return gameState.isSetupSquare(element, 'silver');}), true, 'invalid goal squares for silver');
});
/*
test( '', function() {
	var boardState = new arimaa.boardState(getBoardSpec());
	strictEqual(, , '')
});
*/