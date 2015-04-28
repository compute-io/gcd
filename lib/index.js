'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' ),
	isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' );


// FUNCTIONS //

/**
* FUNCTION: gcd( a, b )
*	Computes the greatest common divisor of two integers `a` and `b`.
*
* @param {Number} a
* @param {Number} b
* @returns {Number} greatest common divisor
*/
function gcd( a, b ) {
	if ( !isInteger( a ) || !isInteger( b ) ) {
		throw new TypeError( 'gcd()::invalid input argument. Must provide integers.' );
	}
	if ( a < 0 ) {
		a = -a;
	}
	if ( b < 0 ) {
		b = -b;
	}
	// [0] Simple cases...
	if ( a === b ) {
		return a;
	}
	if ( a === 0 ) {
		return b;
	}
	if ( b === 0 ) {
		return a;
	}
	// [1] Look for factors of 2...
	if ( a % 2 === 0 ) { // is even
		if ( b % 2 === 1 ) { // is odd
			return gcd( a/2, b );
		}
		// both even...
		return 2 * gcd( a/2, b/2 );
	}
	if ( b % 2 === 0 ) {
		return gcd( a, b/2 );
	}
	// [2] Reduce larger argument...
	if ( a > b ) {
		return gcd( (a-b)/2, b );
	}
	return gcd( (b-a)/2, a );
} // end FUNCTION gcd()


// GREATEST COMMON DIVISOR //

/**
* FUNCTION: compute( arr )
*	Computes the greatest common divisor.
*
* @param {Array} arr - input array of integers
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number|null} greatest common divisor or null.
*/
function compute( arr, clbk ) {
	var len, a, b, i;
	if ( !isArray( arr ) ) {
		throw new TypeError( 'cprod()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'gcd()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}

	len = arr.length;
	if ( !len ) {
		return null;
	}

	if ( !clbk ) {
		// Exploit the fact that the gcd is an associative function...
		a = arr[ 0 ];
		for ( i = 1; i < len; i++ ) {
			b = arr[ i ];
			a = gcd( a, b );
		}
	} else {
		a = clbk( arr[ 0 ] );
		for ( i = 1; i < len; i++ ) {
			b = clbk( arr[ i ] );
			a = gcd( a, b );
		}
	}

	return a;
} // end FUNCTION compute()


// EXPORTS //

module.exports = compute;
