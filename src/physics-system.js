
function PhysicsSystem( tick ) {
	this.tick = tick;
}

PhysicsSystem.prototype.integratePosition = function( positions, speeds ) {
	for ( var i = 0; i < positions.length; i++ ) {
		positions[ i ].x += speeds[ i ].x * this.tick / 1000;
		positions[ i ].y += speeds[ i ].y * this.tick / 1000;
	}
}

PhysicsSystem.prototype.integrateSpeed = function(
	gravitySourcePositions,
	gravitySourceComponents,
	affectedByGravityPositions,
	affectedByGravitySpeeds,
	affectedByGravityComponents
) {
	for ( var i = 0; i < gravitySourcePositions.length; i++ ) {
		for ( var j = 0; j < affectedByGravityPositions.length; j++ ) {
			var p1 = gravitySourcePositions[ i ];
			var p2 = affectedByGravityPositions[ j ];
			var distanceVector = p1.minus( p2 );
			
			var g = 6.67e-11;
			var m1 = gravitySourceComponents[ i ].mass;
			var m2 = affectedByGravityComponents[ j ].mass;
			var dSquared = distanceVector.squaredLength();
			
			var force = g * m1 * m2 / dSquared;
			var forceVector = distanceVector.toUnitVector().times( force );
			
			var speed = affectedByGravitySpeeds[ j ];
			var addedSpeed = forceVector.dividedBy( m2 ).times( this.tick ).dividedBy( 1000 );
			var newSpeed =  speed.plus( addedSpeed );
			
			speed.x = newSpeed.x;
			speed.y = newSpeed.y;
		}
	}
}
