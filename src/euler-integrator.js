
function EulerIntegrator() {}

EulerIntegrator.prototype.updateComponents = function( dt, positions, speeds, accelerations ) {
	for ( var i = 0; i < positions.length; i++ ) {
		speeds[ i ] = speeds[ i ].plus( accelerations[ i ].times( dt / 1000 ) );
		positions[ i ] = positions[ i ].plus( speeds[ i ].times( dt / 1000 ) );
		
		accelerations[ i ] = new Vector( 0, 0 );
	}
	return [ positions, speeds, accelerations ];
}
