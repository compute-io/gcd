'use strict';

var gcd = require( './../lib' );

// Compute the gcd of random tuples...
var x, y, z, arr, val;
for ( var i = 0; i < 100; i++ ) {
	x = Math.round( Math.random()*50 );
	y = Math.round( Math.random()*50 );
	z = Math.round( Math.random()*50 );
	arr = [ x, y, z ];
	val = gcd( arr );
	console.log( arr, val );
}
