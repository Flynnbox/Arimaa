module( "boardState" );

var arimaaSpec = null;

function getBoardSpec(){	
	return arimaaSpec.defineBoard(2, 2, [new Square(1, 1)]);
}

function setup(){
	arimaaSpec = new arimaa.specification();
}

QUnit.moduleStart(setup);

//QUnit.testStart();

test( "construct basic board", function() {
	var boardState = new arimaa.boardState(getBoardSpec());
	notStrictEqual( typeof(boardState), 'undefined', "boardState is undefined");
	notStrictEqual( boardState, null, "boardState is null");
});