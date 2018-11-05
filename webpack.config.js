const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve("prod"),
		filename: "index.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['env','stage-0','react']
					}
				},
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: "[name]_[local]_[hash:base64]",
							sourceMap: true,
							minimize: true
						}
					},
					{
						loader: "sass-loader"
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			actions: path.resolve(__dirname, 'src/actions/'),
			components: path.resolve(__dirname, 'src/components/'),
			containers: path.resolve(__dirname, 'src/containers/'),
			reducers: path.resolve(__dirname, 'src/reducers/'),
			api: path.resolve(__dirname, 'src/api/'),
			helpers: path.resolve(__dirname, 'src/helpers/'),
			theme: path.resolve(__dirname, 'src/theme/'),
		}
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new FaviconsWebpackPlugin('./src/assets/logo/logo.png'),
	],
}