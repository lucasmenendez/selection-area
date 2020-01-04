import pkg from '../package.json';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

let isProd = process.env.NODE_ENV === 'production';

export default [
	{
		input: 'src/selection-area.js',
		output: [
			{ file: pkg.browser, format: 'umd', name: 'SelectionArea' },
			{ file: pkg.main, format: 'cjs' },
		],
		plugins: [
			resolve(),
			babel({
				exclude: 'node_modules/**',
				runtimeHelpers: true,
				presets: [["@babel/preset-env"]],
				plugins: [['@babel/transform-runtime', { useESModules: true }]],
				babelrc: false
			}),
			commonjs(),
			isProd && uglify()
		]
	},
	{
		input: 'src/selection-area.js',
		output: [
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			resolve(),
			babel({
				exclude: 'node_modules/**',
				presets: [["@babel/preset-env"]],
				babelrc: false
			}),
			commonjs()
		]
	}
];