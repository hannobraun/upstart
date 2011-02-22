
describe( "GravityProcessor", function() {
	it( "should integrate the speed according to gravity.", function() {
		var tick = 20;
		var gravityProcessor = new GravityProcessor( tick );
		
		var gravitySourcePosition = new Vector( 0, 0 );
		var gravitySourceComponent = {
			mass: 100000000000
		};
		
		var position = new Vector( 1, 0 );
		var speed = new Vector( 0, 0 );
		var affectedByGravityComponent = {
			mass: 1
		}
		
		gravityProcessor.processComponents(
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
