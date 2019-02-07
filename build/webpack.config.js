const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ROOTPATH = "..";
const PROD = process.env.NODE_ENV === 'production';

function resolve(dir) {
	return path.resolve(__dirname, ROOTPATH, dir);
}

module.exports = {
	mode: 'development',
	entry: {
		"selection-area": resolve('src/selection-area.js')
	},
	output: {
		libraryTarget: 'umd',
		path: resolve('dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
            {
				test: /\.js$/,
				exclude: '/node_modules/',
                loader: 'babel-loader'
			}
		]
	}
}

if (PROD) {
    module.exports.mode = 'production';
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
    ]);
}