
import path from 'path';

export default {
	//enable some debugging information
  debug: true,
  devtool: 'inline-source-map',
	noInfo: false,
	//Entry point of our app
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
	target: 'web',
	//Here we tell webpack where it should create(simulate) our bundle
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
	},
	//We will add plugins here
  plugins: [],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
