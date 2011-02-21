
var tick = 20;

var entityManager = null;

var viewport = null;

var physicsSystem = null;
var renderSystem = null;



function init() {
	entityManager = new EntityManager();
	
	viewport = new Viewport( "canvas" );
	
	physicsSystem = new PhysicsSystem( tick );
	renderSystem = new RenderSystem();
	
	entityManager.defineEntity( "blackHole", {
		position: new Vector( 268, 268 ),
		imagePath: "gfx/black-hole.png"
	} );
	
	var imagePaths = entityManager.componentsByType( [ "imagePath" ] );
	loadImagesAndDo( imagePaths.components[ "imagePath" ], function( loadedImages ) {
		for ( var i = 0; i < imagePaths.entities.length; i++ ) {
			entityManager.addComponentToEntity( "image", loadedImages[ i ], imagePaths.entities[ i ] );
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
	
	var positionsAndImages = entityManager.componentsByType( [ "position", "image" ] );
	renderSystem.render( viewport, positionsAndImages.components[ "position" ], positionsAndImages.components[ "image" ] );
	
	setTimeout( main, tick );
}
