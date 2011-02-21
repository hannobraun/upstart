
describe( "PhysicsSystem", function() {

	var tick = 20;
	var physicsSystem = null;
	
	beforeEach( function() {
		physicsSystem = new PhysicsSystem( tick );
	} );
	
	it( "should integrate the position according to the given tick.", function() {
		var position = {
			x: 0,
			y: 0
		};
		var speed = {
			x: 1000,
			y: 1000
		};
		
		physicsSystem.integratePosition( [ position ], [ speed ] );
		
		expect( position ).toEqual( { x: 20, y: 20 } );
	} );
	
	it( "should integrate the speed according to gravity.", function() {
		var gravitySourcePosition = new Vector( 0, 0 );
		var gravitySourceComponent = {
			mass: 100000000000
		};
		
		var position = new Vector( 1, 0 );
		var speed = new Vector( 0, 0 );
		var affectedByGravityComponent = {
			mass: 1
		}
		
		physicsSystem.integrateSpeed(
			[ gravitySourcePosition ],
			[ gravitySourceComponent ],
			[ position ],
			[ speed ],
			[ affectedByGravityComponent ]
		)
		
		var expectedValue = -0.1334;
		var tolerance = 0.000000001;

		expect( speed.x ).toBeGreaterThan( expectedValue - tolerance );
		expect( speed.x ).toBeLessThan( expectedValue + tolerance );
		
		expect( speed.y ).toEqual( 0 );
	} );
} );
