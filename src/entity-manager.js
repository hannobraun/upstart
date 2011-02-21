
function EntityManager() {
	this.entities = []
}

EntityManager.prototype.defineEntity = function( entityName, entity ) {
	entity.id = entityName;
	this.entities.push( entity );
}

EntityManager.prototype.addComponentToEntity = function( componentName, component, entityId ) {
	var entity = this.entities.filter( function( entity ) {
		return entity.id == entityId;
	} )[ 0 ];
	
	entity[ componentName ] = component;
}

EntityManager.prototype.componentsByType = function( componentTypes ) {
	var entitiesWithTheseComponentTypes = this._findEntitiesWithTheseComponents( componentTypes );
	var entityIds = this._extractIdsFromEntities( entitiesWithTheseComponentTypes );
	var components = this._extractComponentsFromEntities( componentTypes, entitiesWithTheseComponentTypes );
	
	return {
		entities: entityIds,
		components: components
	};
}

EntityManager.prototype._findEntitiesWithTheseComponents = function( componentTypes ) {
	return this.entities.filter( function( entity ) {
		var hasAllComponents = true;
		for ( var i = 0; i < componentTypes.length; i++ ) {
			if ( !entity[ componentTypes[ i ] ] ) {
				hasAllComponents = false;
			}
		}
		return hasAllComponents;
	} );
}

EntityManager.prototype._extractIdsFromEntities = function( entities ) {
	return entities.map( function( entity ) {
		return entity.id;
	} );
}

EntityManager.prototype._extractComponentsFromEntities = function( componentTypes, entities ) {
	var components = {};
	for ( var i = 0; i < componentTypes.length; i++ ) {
		components[ componentTypes[ i ] ] = entities.map( function( entity ) {
			return entity[ componentTypes[ i ] ];	
		} );
	}
	return components;
}
