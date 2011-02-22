
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

InputSystem.prototype.updateComponents = function( pressedKeys, speeds, rotations, controlledByInputs ) {
	for ( var i = 0; i < speeds.length; i++ ) {
		var rotation = rotations[ i ];
		var newRotation = rotation;
		if ( pressedKeys.indexOf( 37 ) != -1 ) {
			newRotation = rotation - rotationSpeed * tick / 1000;
		}
		else if ( pressedKeys.indexOf( 39 ) != -1 ) {
			newRotation = rotation + rotationSpeed * tick / 1000;
		}
		rotations[ i ] = newRotation;
		
		var speed = speeds[ i ];
		if ( pressedKeys.indexOf( 38 ) != -1 ) {
			var accelerationScalar = acceleration * tick / 1000;
			var accelerationVector = new Vector(
					accelerationScalar * Math.sin( newRotation ),
					accelerationScalar * -Math.cos( newRotation ) );
			speed.replaceWith( speed.plus( accelerationVector ) );
		}
	}
	
	return [ speeds, rotations, controlledByInputs ];
}
