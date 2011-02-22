
function PhysicsSystem( tick ) {
	this.tick = tick;
}

PhysicsSystem.prototype.processComponents = function( positions, speeds ) {
	for ( var i = 0; i < positions.length; i++ ) {
		var position = positions[ i ];
		var speed = speeds[ i ];
		
		position.replaceWith( position.plus( speed.times( this.tick / 1000 ) ) );
	}
}
