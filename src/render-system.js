
function RenderSystem() {}

RenderSystem.prototype.render = function( viewport, positions, appearances ) {
	viewport.clear();

	for ( var i = 0; i < positions.length; i++ ) {
		viewport.saveState();
		
		var pos = positions[ i ];
		var appearance = appearances[ i ];
		
		var xScale = viewport.width / viewport.size.x;
		var yScale = viewport.height / viewport.size.y;
		viewport.scale( xScale, yScale );
		
		var x = pos.x - viewport.position.x;
		var y = pos.y - viewport.position.y;
		viewport.translate( x, y );
		
		viewport.scale( appearance.scaleX, appearance.scaleY );
		viewport.translate( appearance.xOffset, appearance.yOffset );
		
		viewport.drawImage( appearance.image, 0, 0 );
		
		viewport.restoreState();
	}
}
