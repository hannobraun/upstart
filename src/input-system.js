
function InputSystem( keysOfInterest ) {
	var self = this;
	
	this.pressedKeys = [];
	
	window.addEventListener( "keydown",
			function( event ) {
				if ( keysOfInterest.indexOf( event.keyCode ) != -1 && self.pressedKeys.indexOf( event.keyCode ) == -1 ) {
					self.pressedKeys.push( event.keyCode );
				} 
			},
			false );
	window.addEventListener( "keyup",
			function( event ) {
				if ( keysOfInterest.indexOf( event.keyCode ) != -1 ) {
					self.pressedKeys = self.pressedKeys.filter( function( keyCode ) {
						return keyCode != event.keyCode;
					} );
				}
			},
			false );
}

InputSystem.prototype.getPressedKeys = function() {
	return this.pressedKeys;
}
