
function Vector( x, y ) {
	this.x = x;
	this.y = y;
}

Vector.prototype.plus = function( other ) {
	return new Vector( this.x + other.x, this.y + other.y );
}

Vector.prototype.minus = function( other ) {
	return new Vector( this.x - other.x, this.y - other.y );
}

Vector.prototype.times = function( m ) {
	return new Vector( this.x * m, this.y * m );
}

Vector.prototype.dividedBy = function( d ) {
	return new Vector( this.x / d, this.y / d );
}

Vector.prototype.dotProduct = function( other ) {
	return this.x * other.x + this.y * other.y;
}

Vector.prototype.length = function() {
	return Math.sqrt( this.x*this.x + this.y*this.y );
}

Vector.prototype.squaredLength = function() {
	return this.x*this.x + this.y*this.y;
}

Vector.prototype.toUnitVector = function() {
	return this.dividedBy( this.length() );
}

Vector.prototype.projectOn = function( other ) {
	return other.times( this.dotProduct( other ) / ( other.dotProduct( other ) ) );
}
