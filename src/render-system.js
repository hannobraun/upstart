
function RenderSystem() {}

RenderSystem.prototype.render = function( viewport, positions, appearances ) {
	viewport.clear();

	for ( var i = 0; i < positions.length; i++ ) {
		viewport.saveState();
		
		var pos = positions[ i ];
		var appearance = appearances[ i ];
		
		var x = pos.x - viewport.position.x + appearance.xOffset;
		var y = pos.y - viewport.position.y + appearance.yOffset;
		
		var xScale = viewport.width / viewport.size.x * appearance.scaleX;
		var yScale = viewport.height / viewport.size.y * appearance.scaleY;
		viewport.scale( xScale, yScale );
		
		viewport.drawImage( appearance.image, x, y );
		
		viewport.restoreState();
	}
}
