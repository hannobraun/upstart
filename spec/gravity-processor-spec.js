
describe( "GravityProcessor", function() {
	it( "should integrate the acceleration according to gravity.", function() {
		var gravityProcessor = new GravityProcessor();
		
		var gravitySourcePosition = new Vector( 0, 0 );
		var gravitySourceComponent = {
			mass: 100000000000
		};
		
		var position = new Vector( 1, 0 );
		var acceleration = new Vector( 0, 0 );
		var affectedByGravityComponent = {
			mass: 1
		}
		
		gravityProcessor.processComponents(
			[ gravitySourcePosition ],
			[ gravitySourceComponent ],
			[ position ],
			[ acceleration ],
			[ affectedByGravityComponent ]
		)
		
		//var expectedValue = -0.1334;
		var expectedValue = -6.67;
		var tolerance = 0.000000001;

		expect( acceleration.x ).toBeGreaterThan( expectedValue - tolerance );
		expect( acceleration.x ).toBeLessThan( expectedValue + tolerance );
		
		expect( acceleration.y ).toEqual( 0 );
	} );
} );
