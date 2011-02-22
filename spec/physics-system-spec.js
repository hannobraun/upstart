
describe( "PhysicsSystem", function() {

	var tick = 20;
	var physicsSystem = null;
	
	beforeEach( function() {
		physicsSystem = new PhysicsSystem( tick );
	} );
	
	it( "should integrate the position according to the given tick.", function() {
		var position = new Vector( 0, 0 );
		var speed = new Vector( 1000, 1000 );
		
		physicsSystem.integratePosition( [ position ], [ speed ] );
		
		expect( position ).toEqual( new Vector( 20, 20 ) );
	} );
} );
