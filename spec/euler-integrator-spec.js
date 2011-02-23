
describe( "EulerIntegrator", function() {

	var eulerIntegrator = null;

	var passedTime = 500;
	
	var position1 = new Vector( 10, 10 );
	var position2 = new Vector( 20, 20 );
	
	var speed1 = new Vector( 2, 2 );
	var speed2 = new Vector( 4, 4 );
	
	var acceleration1 = new Vector( 4, 4 );
	var acceleration2 = new Vector( 8, 8 );
	
	beforeEach( function() {
		eulerIntegrator = new EulerIntegrator();
	} );
	
	it( "should reset acceleration.", function() {
		var result = eulerIntegrator.updateComponents( passedTime,
				[ position1, position2 ],
				[ speed1, speed2 ],
				[ acceleration1, acceleration2 ] );
		var updatedAcceleration = result[ 2 ];
		
		expect( updatedAcceleration ).toEqual( [ new Vector( 0, 0 ), new Vector( 0, 0 ) ] );
	} );
	
	it( "should integrate the speed according to the acceleration and the time difference.", function() {
		var result = eulerIntegrator.updateComponents( passedTime,
				[ position1, position2 ],
				[ speed1, speed2 ],
				[ acceleration1, acceleration2 ] );
		var updatedSpeed = result[ 1 ];
		
		expect( updatedSpeed ).toEqual( [ new Vector( 4, 4 ), new Vector( 8, 8 ) ] );
	} );
	
	it( "should integrate the position according to the speed and the time difference.", function() {
		var result = eulerIntegrator.updateComponents( passedTime,
				[ position1, position2 ],
				[ speed1, speed2 ],
				[ acceleration1, acceleration2 ] );
		var updatedPosition = result[ 0 ];
		
		expect( updatedPosition ).toEqual( [ new Vector( 12, 12 ), new Vector( 24, 24 ) ] );
	} );
} )
