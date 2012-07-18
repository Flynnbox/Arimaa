module( "gameState" );

var arimaaSpec = null;

function getBoardSpec(){	
	return arimaaSpec.defineBoard(2, 2, [new Square(1, 1)]);
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

/*
test( '', function() {
	var boardState = new arimaa.boardState(getBoardSpec());
	strictEqual(, , '')
});
*/