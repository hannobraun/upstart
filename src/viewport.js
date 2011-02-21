
function Viewport( canvasId ) {
	this._canvas = document.getElementById( canvasId );
	this._context = this._canvas.getContext( "2d" );
	
	this.width = this._canvas.width;
	this.height = this._canvas.height;
	
	this.position = {
		x: 0,
		y: 0
	};
	
	this.size = {
		x: this.width,
		y: this.height
	}
}

Viewport.prototype.clear = function() {
	this._context.clearRect( 0, 0, this.width, this.height );
}

Viewport.prototype.drawImage = function( image, x, y ) {
	this._context.drawImage( image, x, y );
}

Viewport.prototype.saveState = function() {
	this._context.save();
}

Viewport.prototype.restoreState = function() {
	this._context.restore();
}

Viewport.prototype.translate = function( x, y ) {
	this._context.translate( x, y );
}

Viewport.prototype.rotate = function( angle ) {
	this._context.rotate( angle );
}

Viewport.prototype.scale = function( x, y ) {
	this._context.scale( x, y );
}
