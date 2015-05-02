/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	gcd = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-gcd', function tests() {

	it( 'should export a function', function test() {
		expect( gcd ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an integer array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			{},
			function(){},
			[ Math.PI, 2 ],
			[ '1', 2 ],
			[ 1, Math.PI ],
			[ 1, '2' ],
			[ 1, NaN ],
			[ 1, null ]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				gcd( value );
			};
		}
	});

	it( 'should throw an error if an accessed value is not an integer', function test() {
		expect( badValue ).to.throw( TypeError );

		function badValue() {
			var arr = [
				{'x':Math.PI},
				{'x':5}
			];

			gcd( arr, getValue );
		}
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				gcd( [ 1, 2 ], value );
			};
		}
	});

	it( 'should return null if provided a array having fewer than 2 elements', function test() {
		assert.isNull( gcd( [] ) );
		assert.isNull( gcd( [ 1 ] ) );
	});

	it( 'should compute the gcd', function test() {
		var data;

		data = [ 0, 0 ];
		assert.strictEqual( gcd( data ), 0 );

		data = [ 1, 0 ];
		assert.strictEqual( gcd( data ), 1 );

		data = [ 0, 1 ];
		assert.strictEqual( gcd( data ), 1 );

		data = [ 6, 4 ];
		assert.strictEqual( gcd( data ), 2 );

		data = [ 6, -4 ];
		assert.strictEqual( gcd( data ), 2 );

		data = [ -6, -4 ];
		assert.strictEqual( gcd( data ), 2 );

		data = [ 15, 20 ];
		assert.strictEqual( gcd( data ), 5 );

		data = [ 20, 15 ];
		assert.strictEqual( gcd( data ), 5 );

		data = [ 35, -21 ];
		assert.strictEqual( gcd( data ), 7 );

		data = [ 48, 18 ];
		assert.strictEqual( gcd( data ), 6 );

		data = [ 8, 12, 16 ];
		assert.strictEqual( gcd( data ), 4 );

		data = [ 25, -35, 95 ];
		assert.strictEqual( gcd( data ), 5 );

		data = [ 95, -35, 25 ];
		assert.strictEqual( gcd( data ), 5 );

		data = [ 1500, 750, 150000, 625 ];
		assert.strictEqual( gcd( data ), 125 );
	});

	it( 'should compute the gcd using an accessor function', function test() {

		var data;

		data = [
			{'x':0},
			{'x':0}
		];
		assert.strictEqual( gcd( data, getValue ), 0 );

		data = [
			{'x':1},
			{'x':0}
		];
		assert.strictEqual( gcd( data, getValue ), 1 );

		data = [
			{'x':95},
			{'x':-35},
			{'x':25}
		];
		assert.strictEqual( gcd( data, getValue ), 5 );

		function getValue( d ) {
			return d.x;
		}
	});

});
