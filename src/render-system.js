
function RenderSystem() {}

RenderSystem.prototype.render = function( viewport, positions, images ) {
	viewport.clear();
	viewport.saveState();

	for ( var i = 0; i < positions.length; i++ ) {
		var pos = positions[ i ];
		var image = images[ i ];
		
		var x = pos.x + viewport.position.x;
		var y = pos.y + viewport.position.y;
		
		var xScale = viewport.size.x / viewport.width;
		var yScale = viewport.size.y / viewport.heigth;
		viewport.scale( xScale, yScale );
		
		viewport.drawImage( image, x, y );		
	}
	
	viewport.restoreState();
}
