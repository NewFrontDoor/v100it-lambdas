import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import bundleSize from 'rollup-plugin-bundle-size';
import builtins from 'builtin-modules';

export default {
	input: 'index.js',
	output: {
		file: 'handler.js',
		format: 'cjs'
	},
	plugins: [
		json(),
		resolve(),
		commonjs({
			sourceMap: false
		}),
		bundleSize()
	],
	external: [
		'aws-sdk',
		'aws-sdk/clients/ses',
		'aws-sdk/clients/s3',
		...builtins
	]
};
