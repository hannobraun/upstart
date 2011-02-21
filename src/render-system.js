
function RenderSystem() {}

RenderSystem.prototype.render = function( camera, positions, images ) {
	camera.context.clearRect( 0, 0, camera.canvas.width, camera.canvas.height );

	for ( var i = 0; i < positions.length; i++ ) {
		var pos = positions[ i ];
		var image = images[ i ];
		
		camera.context.drawImage( image, pos.x, pos.y );		
	}
}
