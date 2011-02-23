
function InputSystem( keysOfInterest, acceleration ) {
	this.acceleration = acceleration;
	this.pressedKeys = [];
	
	var self = this;
	
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

InputSystem.prototype.updateComponents = function( pressedKeys, accelerations, rotations, controlledByInputs ) {
	for ( var i = 0; i < accelerations.length; i++ ) {
		var rotation = rotations[ i ];
		var newRotation = rotation;
		if ( pressedKeys.indexOf( 37 ) != -1 ) {
			newRotation = rotation - rotationSpeed * tick / 1000;
		}
		else if ( pressedKeys.indexOf( 39 ) != -1 ) {
			newRotation = rotation + rotationSpeed * tick / 1000;
		}
		rotations[ i ] = newRotation;
		
		var acceleration = accelerations[ i ];
		if ( pressedKeys.indexOf( 38 ) != -1 ) {
			var accelerationVector = new Vector(
					this.acceleration * Math.sin( newRotation ),
					this.acceleration * -Math.cos( newRotation ) );
			acceleration = acceleration.plus( accelerationVector );
		}
		accelerations[ i ] = acceleration;
	}
	
	return [ accelerations, rotations, controlledByInputs ];
}
