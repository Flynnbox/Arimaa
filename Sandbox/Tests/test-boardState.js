module( "gameState" );

var arimaaSpec = null;

function getBoardSpec(){	
	return arimaaSpec.defineBoard(2, 2, [new Square(1, 1)], arimaaSpec.defineGoalRows(1, 0), arimaaSpec.defineSetupRows([1], [0]));
}

function setup(){
	arimaaSpec = new arimaa.specification();
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
	var gameState = new arimaa.boardState(getBoardSpec());
	var goalSquares = [new Square(0, 1), new Square(1,1)];
	strictEqual(_.all(goalSquares, function(element){ return gameState.isGoalSquare(element, 'gold');}), true, 'invalid goal squares for gold');
});

test( 'verify game board goal squares for silver are rows specified', function() {
	var gameState = new arimaa.boardState(getBoardSpec());
	var goalSquares = [new Square(0, 0), new Square(1,0)];
	strictEqual(_.all(goalSquares, function(element){ return gameState.isGoalSquare(element, 'silver');}), true, 'invalid goal squares for silver');
});

test( 'verify game board setup squares for gold are rows specified', function() {
	var gameState = new arimaa.boardState(getBoardSpec());
	var setupSquares = [new Square(0, 1), new Square(1,1)];
	strictEqual(_.all(setupSquares, function(element){ return gameState.isSetupSquare(element, 'gold');}), true, 'invalid goal squares for gold');
});

test( 'verify game board setup squares for silver are rows specified', function() {
	var gameState = new arimaa.boardState(getBoardSpec());
	var setupSquares = [new Square(0, 0), new Square(1,0)];
	strictEqual(_.all(setupSquares, function(element){ return gameState.isSetupSquare(element, 'silver');}), true, 'invalid goal squares for silver');
});
/*
test( '', function() {
	var boardState = new arimaa.boardState(getBoardSpec());
	strictEqual(, , '')
});
*/