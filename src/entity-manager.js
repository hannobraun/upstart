
function EntityManager() {
	this.entities = new Entities();
}

EntityManager.prototype.createEntity = function( entity ) {
	this.entities.add( entity );
}

EntityManager.prototype.processComponents = function() {
	var components = this.entities.components( arguments );
	return new ComponentProcessor( this.entities, components );
}

EntityManager.prototype.updateComponents = function() {
	var components = this.entities.components( arguments );
	var entitiesToUpdate = this.entities.entitiesWith( arguments );
	var componentsToUpdate = arguments;
	return new ComponentProcessor( this.entities, components, entitiesToUpdate, componentsToUpdate );
}



function Entities() {
	this.nextId = 0;
	this.entities = [];
}

Entities.prototype.add = function( entity ) {
	entity.id = this.nextId++;
	this.entities.push( entity );
}

Entities.prototype.update = function( entityId, componentType, component ) {
	var entity = this.entities.filter( function( entity ) {
		return entity.id == entityId;
	} )[ 0 ];
	entity[ componentType ] = component;
}

Entities.prototype.entitiesWith = function( componentTypes ) {
	var entitiesWithTheseComponents = this._entitiesWithTheseComponents( componentTypes );
	return entitiesWithTheseComponents.map( function( entity ) {
		return entity.id;
	} );
}

Entities.prototype.components = function( componentTypes ) {
	var entitiesWithTheseComponents = this._entitiesWithTheseComponents( componentTypes );
	var components = this._extractComponentsFromEntities( componentTypes, entitiesWithTheseComponents );
	return components;
}

Entities.prototype._entitiesWithTheseComponents = function( componentTypes ) {
	return this.entities.filter( function( entity ) {
		var hasAllComponents = true;
		for ( var i = 0; i < componentTypes.length; i++ ) {
			var componentType = componentTypes[ i ];
			if ( entity[ componentType ] == undefined ) {
				hasAllComponents = false;
			}
		}
		return hasAllComponents;
	} );
}

Entities.prototype._extractComponentsFromEntities = function( componentTypes, entities ) {
	var allComponents = [];
	
	for ( var i = 0; i < componentTypes.length; i++ ) {
		var componentType = componentTypes[ i ];
		var components = entities.map( function( entity ) {
			return entity[ componentType ];
		} );
		allComponents.push( components );
	}
	
	return allComponents;
}



function ComponentProcessor( entities, components, entitiesToUpdate, componentsToUpdate ) {
	this.entities = entities;
	this.components = components;
	this.entitiesToUpdate = entitiesToUpdate;
	this.componentsToUpdate = componentsToUpdate;
	
	this.additionalParameters = [];
}

ComponentProcessor.prototype.using = function( system ) {
	var parameters = this.additionalParameters.concat( this.components );
	
	if ( this.entitiesToUpdate && this.componentsToUpdate ) {
		var result = system.updateComponents.apply( system, parameters );
	
		for ( var entityIndex = 0; entityIndex < this.entitiesToUpdate.length; entityIndex++ ) {
			for ( var componentIndex = 0; componentIndex < this.componentsToUpdate.length; componentIndex++ ) {
				var entityId = this.entitiesToUpdate[ entityIndex ];
				var componentType = this.componentsToUpdate[ componentIndex ];
				var component = result[ componentIndex ][ entityIndex ];
				this.entities.update( entityId, componentType, component );
			}
		}
	}
	else {
		system.processComponents.apply( system, parameters );
	}
}

ComponentProcessor.prototype.withParameters = function() {
	// Since arguments is just array-like, not a real Array, we convert it here. Otherwise it's just a hassle later on. 
	for ( var i = 0; i < arguments.length; i++ ) {
		this.additionalParameters.push( arguments[ i ] );
	}
	
	return this;
}

ComponentProcessor.prototype.withParameter = ComponentProcessor.prototype.withParameters;

ComponentProcessor.prototype.and = function() {
	var additionalComponents = this.entities.components( arguments );
	this.components = this.components.concat( additionalComponents );
	return this;
}



// Some scaffolding to keep compatibility with the previous API.
EntityManager.prototype.defineEntity = function( id, entity ) {
	this.createEntity( entity );
}

EntityManager.prototype.componentsByType = function( componentTypes ) {
	var entityIds = this.entities.entitiesWith( componentTypes );
	var components = this.entities.components( componentTypes );
	
	var result = {
		entities: entityIds,
		components: {}
	}
	for ( var i = 0; i < componentTypes.length; i++ ) {
		result.components[ componentTypes[ i ] ] = components[ i ];
	}
	
	return result;
}

EntityManager.prototype.addComponentToEntity = function( componentType, component, entityId ) {
	this.entities.update( entityId, componentType, component );
}
