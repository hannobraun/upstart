
function RenderSystem() {}

RenderSystem.prototype.render = function( viewport, positions, images ) {
	viewport.clear();

	for ( var i = 0; i < positions.length; i++ ) {
		var pos = positions[ i ];
		var image = images[ i ];
		
		viewport.drawImage( image, pos.x, pos.y );		
	}
}
