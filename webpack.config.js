var path = require('path');

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: 'view-anim.js',
		path: path.resolve(__dirname, './dist'),
		library: 'ViewAnimation',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}
}