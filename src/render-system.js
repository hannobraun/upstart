
function RenderSystem() {}

RenderSystem.prototype.render = function( viewport, positions, images ) {
	viewport.clear();

	for ( var i = 0; i < positions.length; i++ ) {
		var pos = positions[ i ];
		var image = images[ i ];
		
		var x = pos.x + viewport.position.x;
		var y = pos.y + viewport.position.y;
		
		viewport.drawImage( image, x, y );		
	}
}
