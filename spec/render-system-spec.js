
describe( "RenderSystem", function() {

	var renderSystem = null;
	
	var viewport = null;
	
	var position = new Vector( 10, 10 );
	var image = {};
	
	beforeEach( function() {
		renderSystem = new RenderSystem();
		
		viewport = {
			position: {
				x: 0,
				y: 0
			},
			clear: function() {},
			drawImage: function() {}
		};
	} );

	it( "should clear the viewport before drawing anything.", function() {
		spyOn( viewport, "clear" );
		
		renderSystem.render( viewport, [ position ], [ image ] );
		
		expect( viewport.clear ).toHaveBeenCalled();
	} );
	
	it( "should draw an image unscaled and at its actual position, if the viewport has default values.", function() {
		spyOn( viewport, "drawImage" );
		
		renderSystem.render( viewport, [ position ], [ image ] );
		
		expect( viewport.drawImage ).toHaveBeenCalledWith( image, 10, 10 );
	} );
	
	it( "should translate an image's position before drawing it, if the viewport's position isn't at the origin", function() {
		viewport.position = {
			x: 5,
			y: 5
		};
		spyOn( viewport, "drawImage" );
		
		renderSystem.render( viewport, [ position ], [ image ] );
		
		expect( viewport.drawImage ).toHaveBeenCalledWith( image, 15, 15 );
	} );
} );