
describe( "Vector", function() {
	
	it( "should make the vector's component accessible as attributes.", function() {
		var x = 1;
		var y = 2;
		
		var vector = new Vector( x, y );
		
		expect( vector.x ).toEqual( x );
		expect( vector.y ).toEqual( y );
	} );
	
	it( "should add another vector.", function() {
		var vector1 = new Vector( 1, 2 );
		var vector2 = new Vector( 2, 1 );
		
		var result = vector1.plus( vector2 );
		
		expect( result ).toEqual( new Vector( 3, 3 ) );
	} );
	
	it( "should substract another vector.", function() {
		var vector1 = new Vector( 1, 2 );
		var vector2 = new Vector( 2, 1 );
	
		var result = vector1.minus( vector2 );
		
		expect( result ).toEqual( new Vector( -1, 1 ) );
	} );
	
	it( "should multiply itself with a scalar.", function() {
		var vector = new Vector( 1, 2 );
		
		var result = vector.times( 2 );
		
		expect( result ).toEqual( new Vector( 2, 4 ) );
	} );
	
	it( "should divide itself by a scalar.", function() {
		var vector = new Vector( 2, 4 );
		
		var result = vector.dividedBy( 2 );
		
		expect( result ).toEqual( new Vector( 1, 2 ) );
	} );
	
	it( "should compute the dot product with another vector.", function() {
		var vector1 = new Vector( 1, 2 );
		var vector2 = new Vector( 2, 1 );
		
		var result = vector1.dotProduct( vector2 );
		
		expect( result ).toEqual( 4 );
	} );
	
	it( "should compute its length.", function() {
		var xAlignedVector = new Vector( 2, 0 );
		var yAlignedVector = new Vector( 0, 2 );
		var nonAlignedVector = new Vector( 2, 2 );
		
		expect( xAlignedVector.length() ).toEqual( 2 );
		expect( yAlignedVector.length() ).toEqual( 2 );
		
		expect( nonAlignedVector.length() ).toBeGreaterThan( 2 );
		expect( nonAlignedVector.length() ).toBeLessThan( 3 );
	} );
	
	it( "should compute its squared length.", function() {
		var vector = new Vector( 2, 2 );
		
		var squaredLength = vector.squaredLength();
		
		expect( squaredLength ).toEqual( 8 );
	} );
	
	it( "should return the unit vector with the same direction.", function() {
		var xAxisAlignedVector = new Vector( 2, 0 );
		var yAxisAlignedVector = new Vector( 0, 3 );
		
		expect( xAxisAlignedVector.toUnitVector() ).toEqual( new Vector( 1, 0 ) );
		expect( yAxisAlignedVector.toUnitVector() ).toEqual( new Vector( 0, 1 ) );
	} );
	
	it( "should project itself onto another vector.", function () {
		var vector = new Vector( 2, 2 );
		var xUnitVector = new Vector( 1, 0 );
		var yUnitVector = new Vector( 0, 1 );
		
		var xProjection = vector.projectOn( xUnitVector );
		var yProjection = vector.projectOn( yUnitVector );
		
		expect( xProjection ).toEqual( new Vector( 2, 0 ) );
		expect( yProjection ).toEqual( new Vector( 0, 2 ) );
	} );
} );
