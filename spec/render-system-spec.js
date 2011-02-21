
describe( "RenderSystem", function() {

	var renderSystem = null;
	
	var viewport = null;
	
	var position = new Vector( 10, 10 );
	var image = {};
	
	beforeEach( function() {
		renderSystem = new RenderSystem();
		
		viewport = {
			clear: function() {},
			drawImage: function() {}
		};
	} );

	it( "should clear the viewport before drawing anything.", function() {
		spyOn( viewport, "clear" );
		
		renderSystem.render( viewport, [ position ], [ image ] );
		
		expect( viewport.clear ).toHaveBeenCalled();
	} );
	
	it( "should draw an unscaled image to the viewport, if the zoom factor is 1.", function() {
		spyOn( viewport, "drawImage" );
		
		renderSystem.render( viewport, [ position ], [ image ] )
		
		expect( viewport.drawImage ).toHaveBeenCalledWith( image, 10, 10 );
	} );
} );
