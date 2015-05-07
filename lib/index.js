'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isInteger = require( 'validate.io-integer' ),
	isFunction = require( 'validate.io-function' );


// VARIABLES //

var MAXINT = Math.pow( 2, 53 ) - 1;


// FUNCTIONS //

/**
* FUNCTION: gcd( a, b )
*	Computes the greatest common divisor of two integers `a` and `b`, using the binary GCD algorithm.
*
* @param {Number} a - integer
* @param {Number} b - integer
* @returns {Number} greatest common divisor
*/
function gcd( a, b ) {
	var k = 1,
		t;
	// Simple cases:
	if ( a === 0 ) {
		return b;
	}
	if ( b === 0 ) {
		return a;
	}
	// Reduce `a` and/or `b` to odd numbers and keep track of the greatest power of 2 dividing both `a` and `b`...
	while ( a%2 === 0 && b%2 === 0 ) {
		a = a / 2; // right shift
		b = b / 2; // right shift
		k = k * 2; // left shift
	}
	// Reduce `a` to an odd number...
	while ( a%2 === 0 ) {
		a = a / 2; // right shift
	}
	// Henceforth, `a` is always odd...
	while ( b ) {
		// Remove all factors of 2 in `b`, as they are not common...
		while ( b%2 === 0 ) {
			b = b / 2; // right shift
		}
		// `a` and `b` are both odd. Swap values such that `b` is the larger of the two values, and then set `b` to the difference (which is even)...
		if ( a > b ) {
			t = b;
			b = a;
			a = t;
		}
		b = b - a; // b=0 iff b=a
	}
	// Restore common factors of 2...
	return k * a;
} // end FUNCTION gcd()

/**
* FUNCTION: bitwise( a, b )
*	Computes the greatest common divisor of two integers `a` and `b`, using the binary GCD algorithm and bitwise operations.
*
* @param {Number} a - safe integer
* @param {Number} b - safe integer
* @returns {Number} greatest common divisor
*/
function bitwise( a, b ) {
	var k = 0,
		t;
	// Simple cases:
	if ( a === 0 ) {
		return b;
	}
	if ( b === 0 ) {
		return a;
	}
	// Reduce `a` and/or `b` to odd numbers and keep track of the greatest power of 2 dividing both `a` and `b`...
	while ( (a & 1) === 0 && (b & 1) === 0 ) {
		a >>>= 1; // right shift
		b >>>= 1; // right shift
		k++;
	}
	// Reduce `a` to an odd number...
	while ( (a & 1) === 0 ) {
		a >>>= 1; // right shift
	}
	// Henceforth, `a` is always odd...
	while ( b ) {
		// Remove all factors of 2 in `b`, as they are not common...
		while ( (b & 1) === 0 ) {
			b >>>= 1; // right shift
		}
		// `a` and `b` are both odd. Swap values such that `b` is the larger of the two values, and then set `b` to the difference (which is even)...
		if ( a > b ) {
			t = b;
			b = a;
			a = t;
		}
		b = b - a; // b=0 iff b=a
	}
	// Restore common factors of 2...
	return a << k;
} // end FUNCTION bitwise()


// GREATEST COMMON DIVISOR //

/**
* FUNCTION: compute( arr[, clbk] )
*	Computes the greatest common divisor.
*
* @param {Number[]|Number} arr - input array of integers
* @param {Function|Number} [clbk] - accessor function for accessing array values
* @returns {Number|Null} greatest common divisor or null.
*/
function compute( arr, clbk ) {
	var len, a, b, i;

	// Case 1: Have we been provided with two integers?
	if ( isInteger( arr ) && isInteger( clbk ) ) {
		a = arr;
		b = clbk;
		if ( a < 0 ) {
			a = -a;
		}
		if ( b < 0 ) {
			b = -b;
		}
		if ( a <= MAXINT && b <= MAXINT ) {
			return bitwise( a, b );
		} else {
			return gcd( a, b );
		}
	}
	// Case 2: Compute the GCD for an array of integers...
	if ( !isArray( arr ) ) {
		throw new TypeError( 'gcd()::invalid input argument. Must provide an array of integers. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'gcd()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}
	len = arr.length;
	if ( len < 2 ) {
		return null;
	}
	a = ( clbk ) ? clbk( arr[ 0 ], 0 ) : arr[ 0 ];
	if ( !isInteger( a ) ) {
		throw new TypeError( 'gcd()::invalid input argument. Accessed array values must be integers. Value: `' + a + '`.' );
	}
	if ( a < 0 ) {
		a = -a;
	}
	// Exploit the fact that the gcd is an associative function...
	for ( i = 1; i < len; i++ ) {
		b = ( clbk ) ? clbk( arr[ i ], i ) : arr[ i ];
		if ( !isInteger( b ) ) {
			throw new TypeError( 'gcd()::invalid input argument. Accessed array values must be integers. Value: `' + b + '`.' );
		}
		if ( b < 0 ) {
			b = -b;
		}
		if ( a <= MAXINT && b <= MAXINT ) {
			a = bitwise( a, b );
		} else {
			a = gcd( a, b );
		}
	}
	return a;
} // end FUNCTION compute()


// EXPORTS //

module.exports = compute;
