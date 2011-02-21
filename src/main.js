
var tick = 20;

var entityManager = null;

var viewport = null;

var physicsSystem = null;
var renderSystem = null;



function init() {
	entityManager = new EntityManager();
	
	viewport = new Viewport( "canvas" );
	viewport.position = {
		x: 200,
		y: 200
	}
	viewport.size = {
		x: 200,
		y: 200
	}
	
	physicsSystem = new PhysicsSystem( tick );
	renderSystem = new RenderSystem();
	
	entityManager.defineEntity( "projectile", {
		position: new Vector( 250, 250 ),
		speed: new Vector( 10, -10 ),
		affectedByGravity: {
			mass: 1
		},
		imagePath: "gfx/projectile.png"
	} );
	entityManager.defineEntity( "blackHole", {
		position: new Vector( 268, 268 ),
		gravitySource: {
			mass: 100000000000000
		},
		imagePath: "gfx/black-hole.png"
	} );
	
	var imagePaths = entityManager.componentsByType( [ "imagePath" ] );
	loadImagesAndDo( imagePaths.components[ "imagePath" ], function( loadedImages ) {
		for ( var i = 0; i < imagePaths.entities.length; i++ ) {
			var appearance = {
				image: loadedImages[ i ]
			}
			entityManager.addComponentToEntity( "appearance", appearance, imagePaths.entities[ i ] );
		}
		main();
	} );
}

function main() {
	var positionAndGravitySource = entityManager.componentsByType( [ "position", "gravitySource" ] );
	var positionAndSpeedAndAffectedByGravity = entityManager.componentsByType( [ "position", "speed", "affectedByGravity" ] );
	physicsSystem.integrateSpeed(
		positionAndGravitySource.components[ "position" ],
		positionAndGravitySource.components[ "gravitySource" ],
		positionAndSpeedAndAffectedByGravity.components[ "position" ],
		positionAndSpeedAndAffectedByGravity.components[ "speed" ],
		positionAndSpeedAndAffectedByGravity.components[ "affectedByGravity" ]
	);

	var positionsAndSpeeds = entityManager.componentsByType( [ "position", "speed" ] );
	physicsSystem.integratePosition( positionsAndSpeeds.components[ "position" ], positionsAndSpeeds.components[ "speed" ] );
	
	var positionsAndImages = entityManager.componentsByType( [ "position", "appearance" ] );
	renderSystem.render( viewport, positionsAndImages.components[ "position" ], positionsAndImages.components[ "appearance" ] );
	
	setTimeout( main, tick );
}
