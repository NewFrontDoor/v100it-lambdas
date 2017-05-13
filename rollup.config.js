import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	format: 'cjs',
	plugins: [
		json(),
		resolve({
			jsnext: true,
			main: true,
			preferBuiltins: true
		}),
		commonjs({
			sourceMap: false,
			ignore: [
				'aws-sdk'
			]
		})
	],
	external: [
		'aws-sdk',
		'buffer',
		'crypto',
		'dns',
		'events',
		'fs',
		'http',
		'https',
		'net',
		'os',
		'punycode',
		'stream',
		'string_decoder',
		'tls',
		'url',
		'util',
		'zlib'
	],
	dest: 'handler.js'
};
