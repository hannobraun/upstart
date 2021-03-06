
describe( "RenderSystem", function() {

	var renderSystem = null;
	
	var viewport = null;
	
	var position = new Vector( 10, 10 );
	var rotation = 0;
	var appearance = {
		image: {},
		xOffset: 0,
		yOffset: 0,
		scaleX: 1,
		scaleY: 1
	}
	
	beforeEach( function() {
		renderSystem = new RenderSystem();
		
		viewport = {
			width: 100,
			height: 100,
			position: {
				x: 0,
				y: 0
			},
			size: {
				x: 100,
				y: 100
			},
			clear: function() {},
			drawImage: function() {},
			saveState: function() {},
			restoreState: function() {},
			scale: function() {},
			translate: function() {},
			rotate: function() {}
		};
	} );

	it( "should clear the viewport before drawing anything.", function() {
		spyOn( viewport, "clear" );
		
		renderSystem.processComponents( viewport, [ position ], [ rotation ], [ appearance ] );
		
		expect( viewport.clear ).toHaveBeenCalled();
	} );
	
	it( "should draw an image unscaled and at its actual position, if the viewport has default values.", function() {
		spyOn( viewport, "translate" );
		spyOn( viewport, "drawImage" );
		
		renderSystem.processComponents( viewport, [ position ], [ rotation ], [ appearance ] );
		
		expect( viewport.translate ).toHaveBeenCalledWith( 10, 10 );
		expect( viewport.drawImage ).toHaveBeenCalledWith( appearance.image, 0, 0 );
	} );
	
	it( "should translate an image's position before drawing it, if the viewport's position isn't at the origin", function() {
		viewport.position = {
			x: 5,
			y: 5
		};
		spyOn( viewport, "translate" );
		spyOn( viewport, "drawImage" );
		
		renderSystem.processComponents( viewport, [ position ], [ rotation ], [ appearance ] );
		
		expect( viewport.translate ).toHaveBeenCalledWith( 5, 5 );
		expect( viewport.drawImage ).toHaveBeenCalledWith( appearance.image, 0, 0 );
	} );
	
	it( "should take the appearance's offset into account when drawing the image.", function() {
		appearance.xOffset = 5;
		appearance.yOffset = 5;
		spyOn( viewport, "translate" );
		spyOn( viewport, "drawImage" );
		
		renderSystem.processComponents( viewport, [ position ], [ rotation ], [ appearance ] );
		
		expect( viewport.translate ).toHaveBeenCalledWith( 10, 10 );
		expect( viewport.translate ).toHaveBeenCalledWith( 5, 5 );
		expect( viewport.drawImage ).toHaveBeenCalledWith( appearance.image, 0, 0 );
	} );
	
	it( "should scale an image before drawing it, if the viewport's size is smaller than then canvas it's rendered on.", function() {
		viewport.size = {
			x: 50,
			y: 25
		};
		spyOn( viewport, "saveState" );
		spyOn( viewport, "restoreState" );
		spyOn( viewport, "scale" );
		
		renderSystem.processComponents( viewport, [ position ], [ rotation ], [ appearance ] );
		
		expect( viewport.scale ).toHaveBeenCalledWith( 2, 4 );
		expect( viewport.saveState ).toHaveBeenCalled();
		expect( viewport.restoreState ).toHaveBeenCalled();
	} );
	
	it( "should take the scale of an image into account when drawing.", function() {
		appearance.scaleX = 2;
		appearance.scaleY = 3;
		spyOn( viewport, "scale" );
		
		renderSystem.processComponents( viewport, [ position ], [ rotation ], [ appearance ] );
		
		expect( viewport.scale ).toHaveBeenCalledWith( 2, 3 );
	} );
	
	it( "should take rotation into account when drawing an image.", function() {
		rotation = 1;
		spyOn( viewport, "rotate" );
		
		renderSystem.processComponents( viewport, [ position ], [ rotation ], [ appearance ] );
		
		expect( viewport.rotate ).toHaveBeenCalledWith( 1 );
	} );
} );
