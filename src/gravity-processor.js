
function GravityProcessor( tick ) {
	this.tick = tick;
}

GravityProcessor.prototype.processComponents = function(
	gravitySourcePositions,
	gravitySourceComponents,
	affectedByGravityPositions,
	affectedByGravityAccelerations,
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
			
			var acceleration = affectedByGravityAccelerations[ j ];
			var addedAcceleration = forceVector.dividedBy( m2 );
			var newAcceleration = acceleration.plus( addedAcceleration );
			
			acceleration.replaceWith( newAcceleration );
		}
	}
}
