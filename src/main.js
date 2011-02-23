
var tick = 20;
var rotationSpeed = 1;
var acceleration = 10;

var entityManager = null;

var mainViewport = null;
var zoomedViewport = null;

var eulerIntegrator = null;
var gravityProcessor = null;
var inputSystem = null;
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
	
	eulerIntegrator = new EulerIntegrator();
	gravityProcessor = new GravityProcessor( tick );
	inputSystem = new InputSystem( [ 37, 38, 39 ], acceleration );
	renderSystem = new RenderSystem();
	
	entityManager.createEntity( {
		position: new Vector( 250, 250 ),
		speed: new Vector( 15, -15 ),
		acceleration: new Vector( 0, 0 ),
		rotation: 0,
		affectedByGravity: {
			mass: 1
		},
		appearance: {
			imagePath: "gfx/rocket.png",
			scaleX: 0.25,
			scaleY: 0.25
		},
		centeredOn: {},
		controlledByInput: {}
	} );
	entityManager.createEntity( {
		position: new Vector( 300, 300 ),
		rotation: 0,
		gravitySource: {
			mass: 1000000000000000
		},
		appearance: {
			imagePath: "gfx/black-hole.png",
			scaleX: 1,
			scaleY: 1
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
				scaleX: appearances.components[ "appearance" ][ i ].scaleX,
				scaleY: appearances.components[ "appearance" ][ i ].scaleY
			}
			entityManager.addComponentToEntity( "appearance", appearance, appearances.entities[ i ] );
		}
		main();
	} );
}

function main() {
	var pressedKeys = inputSystem.getPressedKeys();
	
	entityManager.updateComponents( "acceleration", "rotation", "controlledByInput" )
			.withParameter( pressedKeys )
			.using( inputSystem );
	
	entityManager.processComponents( "position", "gravitySource" )
			.and( "position", "acceleration", "affectedByGravity" )
			.using( gravityProcessor );
	
	entityManager.updateComponents( "position", "speed", "acceleration" )
			.withParameter( tick )
			.using( eulerIntegrator );
	
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
	
	entityManager.processComponents( "position", "rotation", "appearance" )
			.withParameter( mainViewport )
			.using( renderSystem );
			
	entityManager.processComponents( "position", "rotation", "appearance" )
			.withParameter( zoomedViewport )
			.using( renderSystem );
	
	setTimeout( main, tick );
}
