
function Viewport( canvasId ) {
	this._canvas = document.getElementById( canvasId );
	this._context = this._canvas.getContext( "2d" );
	
	this.width = this._canvas.width;
	this.height = this._canvas.height;
	
	this.center = {
		x: this._canvas.width / 2,
		y: this._canvas.height / 2
	};
	
	this.zoom = 1;
}

Viewport.prototype.clear = function() {
	this._context.clearRect( 0, 0, this.width, this.height );
}

Viewport.prototype.drawImage = function( image, x, y ) {
	this._context.drawImage( image, x, y );
}
