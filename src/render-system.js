
function RenderSystem() {}

RenderSystem.prototype.render = function( viewport, positions, appearances ) {
	viewport.clear();

	for ( var i = 0; i < positions.length; i++ ) {
		viewport.saveState();
		
		var pos = positions[ i ];
		var image = appearances[ i ].image;
		
		var x = pos.x - viewport.position.x;
		var y = pos.y - viewport.position.y;
		
		var xScale = viewport.width / viewport.size.x;
		var yScale = viewport.height / viewport.size.y;
		viewport.scale( xScale, yScale );
		
		viewport.drawImage( image, x, y );
		
		viewport.restoreState();
	}
}
