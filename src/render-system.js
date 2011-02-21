
function RenderSystem( canvasId, width, height ) {
	this.canvas = document.getElementById( canvasId );
	this.context = this.canvas.getContext( "2d" );
	
	this.canvas.width = width;
	this.canvas.height = height;
}

RenderSystem.prototype.render = function( positions, images ) {
	this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

	for ( var i = 0; i < positions.length; i++ ) {
		var pos = positions[ i ];
		var image = images[ i ];
		
		this.context.drawImage( image, pos.x, pos.y );		
	}
}
