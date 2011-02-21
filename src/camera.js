
function Camera( canvasId, renderWidth, renderHeight ) {
	this.canvas = document.getElementById( canvasId );
	this.context = this.canvas.getContext( "2d" );
	
	this.canvas.width = renderWidth;
	this.canvas.height = renderHeight;
}
