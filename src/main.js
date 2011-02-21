
var tick = 20;

var entityManager = null;

var mainViewport = null;
var zoomedViewport = null;

var physicsSystem = null;
var renderSystem = null;



function init() {
	entityManager = new EntityManager();
	
	mainViewport = new Viewport( "main" );
	zoomedViewport = new Viewport( "zoomed" );
	zoomedViewport.position = {
		x: 250,
		y: 250
	}
	zoomedViewport.size = {
		x: 100,
		y: 100
	}
	
	physicsSystem = new PhysicsSystem( tick );
	renderSystem = new RenderSystem();
	
	entityManager.defineEntity( "projectile", {
		position: new Vector( 250, 250 ),
		speed: new Vector( 15, -15 ),
		affectedByGravity: {
			mass: 1
		},
		appearance: {
			imagePath: "gfx/projectile.png",
			scale: 1
		},
		centeredOn: {}
	} );
	entityManager.defineEntity( "blackHole", {
		position: new Vector( 300, 300 ),
		gravitySource: {
			mass: 1000000000000000
		},
		appearance: {
			imagePath: "gfx/black-hole.png",
			scale: 1
		}
	} );
	
	var appearances = entityManager.componentsByType( [ "appearance" ] );
	var imagePaths = appearances.components[ "appearance" ].map( function( appearance ) { return appearance.imagePath } );
	loadImagesAndDo( imagePaths, function( loadedImages ) {
		for ( var i = 0; i < appearances.entities.length; i++ ) {
			var image = loadedImages[ i ];
			var appearance = {
				image: image,
				xOffset: -image.width / 2,
				yOffset: -image.height / 2,
				scale: appearances.components[ "appearance" ][ i ].scale
			}
			entityManager.addComponentToEntity( "appearance", appearance, appearances.entities[ i ] );
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
	
	var center = entityManager.componentsByType( [ "position", "centeredOn" ] ).components[ "position" ][ 0 ];
	var size = 80;
	zoomedViewport.position = {
		x: center.x - size / 2,
		y: center.y - size / 2
	}
	zoomedViewport.size = {
		x: size,
		y: size
	}
	
	var positionsAndImages = entityManager.componentsByType( [ "position", "appearance" ] );
	renderSystem.render( mainViewport, positionsAndImages.components[ "position" ], positionsAndImages.components[ "appearance" ] );
	renderSystem.render( zoomedViewport, positionsAndImages.components[ "position" ], positionsAndImages.components[ "appearance" ] );
	
	setTimeout( main, tick );
}
