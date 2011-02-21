
function Camera( canvasId ) {
	this.canvas = document.getElementById( canvasId );
	this.context = this.canvas.getContext( "2d" );
	
	this.target = {
		x: this.canvas.width / 2,
		y: this.canvas.height / 2
	};
	
	this.zoom = 1;
}
