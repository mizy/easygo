const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { env } = require('process');

const isDev = env.NODE_ENV!=='production';
const config = {
	entry: {
		app: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
		pathinfo: false,
	},
	mode:env.NODE_ENV,
	devServer: {
		hot:true,
		host:'0.0.0.0',
		port:996,
		https:true,
		contentBase: ['/public'],
		contentBasePublicPath:'/public/',
		overlay:true,
		historyApiFallback: true,
		watchOptions:{
			aggregateTimeout: 1000,
			poll: 1000
		}
	},
	devtool: isDev?'eval-cheap-module-source-map':false,
	module: {
		rules: [
			{ 	
				test: /\.jsx?$/, 
				include: path.resolve(__dirname, 'src'),
				use: 'babel-loader' 
			},
			{ 	
				test: /\.css$/, 
				use: ['style-loader','css-loader'] 
			},
			{ 	
				test: /\.less$/, 
				include: path.resolve(__dirname, 'src'),
				use: ['style-loader','css-loader','less-loader'] 
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use:"url-loader"
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use:"file-loader",
			},
		]
	},
	resolve:{
		alias:{
			"@":path.resolve("./src")
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
		}),
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			title: '测试',
		}),
		new webpack.ProgressPlugin(),
		...(!isDev?[
			new CleanWebpackPlugin(),
			new ManifestPlugin(),
			new WorkboxPlugin.GenerateSW({
				clientsClaim: true,
				skipWaiting: true,
			}),
			new CopyPlugin({
				patterns: [
					{
					  from: '/public/*',
					  to: '/dist/public',
					},
				]
			})
		]:[
			new webpack.HotModuleReplacementPlugin()
		])
	]
};
module.exports = config;