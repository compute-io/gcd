'use strict';

var gcd = require( './../lib' );

// Compute the gcd of random tuples...
var x, y, z, val;
for ( var i = 0; i < 100; i++ ) {
	x = Math.round( Math.random()*50 );
	y = Math.round( Math.random()*50 );
	z = Math.round( Math.random()*50 );
	val = gcd( [x,y,z] );
	console.log( val );
}
