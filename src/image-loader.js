
function loadImagesAndDo( imagePaths, fn ) {
	var waitingForImages = imagePaths.length;
	var images = [];
	
	for ( var i = 0; i < imagePaths.length; i++ ) {
		var image = new Image();
		images.push( image );
		
		image.onload = function() {
			waitingForImages--;
			if ( waitingForImages == 0 ) {
				fn( images );
			}
		}
		
		image.src = imagePaths[ i ];
	}
}
