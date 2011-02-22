
describe( "EntityManager", function() {

	var entityManager = null;
	var exampleSystem = null;
	
	// components
	var a1 = "a1";
	var a2 = "a2";
	var b1 = "b1";
	var b2 = "b2";
	var c1 = "c1";
	var c2 = "c2";
	var d1 = "d1";
	var d2 = "d2";
	
	beforeEach( function() {
		entityManager = new EntityManager();
		
		entityManager.createEntity( {
			a: a1,
			b: b1
		} );
		entityManager.createEntity( {
			a: a2,
			b: b2
		} );
		entityManager.createEntity( {
			c: c1,
			d: d1
		} );
		entityManager.createEntity( {
			c: c2,
			d: d2,
		} );
		
		exampleSystem = {
			processComponents: function() {},
			updateComponents: function() {}
		};
	} );
	
	describe( "processComponents", function() {
		beforeEach( function() {
			spyOn( exampleSystem, "processComponents" );
		} );
		
		it( "should pass requested components to a system.", function() {
			entityManager.processComponents( "a", "b" ).using( exampleSystem );
		
			expect( exampleSystem.processComponents ).toHaveBeenCalledWith( [ a1, a2 ], [ b1, b2 ] );
		} );
		
		it( "should pass additional parameters to a system.", function() {
			var p1 = "p1";
			var p2 = "p2";
			
			entityManager.processComponents( "a", "b" )
					.withParameters( p1, p2 )
					.using( exampleSystem );
		
			expect( exampleSystem.processComponents ).toHaveBeenCalledWith( p1, p2, [ a1, a2 ], [ b1, b2 ] );
		} );
	
		it( "should pass several sets of components to a system.", function() {
			entityManager.processComponents( "a", "b" )
					.and( "c", "d" )
					.using( exampleSystem );
		
			expect( exampleSystem.processComponents )
					.toHaveBeenCalledWith( [ a1, a2 ], [ b1, b2 ], [ c1, c2 ], [ d1, d2 ] );
		} );
	} );
	
	describe( "updateComponents", function() {
		it( "should replace the entity's components with the updated ones returned by the system.", function() {
			// updated components
			var a1New = "a1+";
			var a2New = "a2+";
			var b1New = "b1+";
			var b2New = "b2+";
			var updatedComponents = [ [ a1New, a2New ], [ b1New, b2New ] ];
			
			spyOn( exampleSystem, "updateComponents" ).andReturn( updatedComponents );
			
			entityManager.updateComponents( "a", "b" ).using( exampleSystem );
			
			expect( entityManager.entities.components( [ "a", "b" ] ) ).toEqual( updatedComponents );
		} );
	} );
} );
