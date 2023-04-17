const { merge } = require('webpack-merge'); 
const TerserPlugin = require('terser-webpack-plugin'); 
const CopyPlugin = require('copy-webpack-plugin'); 
const base = require('./webpack.config'); 
const dirname = require('path');

module.exports = merge(base, { 
   mode: 'production', 
   output: { 
        path: dirname.resolve(__dirname, "./dist"),   
        filename: 'bundle.min.js', 
   },  
   devtool: false, 
   performance: {
        maxEntrypointSize: 900000,
        maxAssetSize: 900000
   },
   optimization: {
      minimizer: [
         new TerserPlugin({
            terserOptions: {
               output: {
                  comments: false, 
               },
            },
         }),
      ],
   },  
   plugins: [
      new CopyPlugin({ 
         patterns: [
            { from: "assets", to: "assets", noErrorOnMissing: false },
         ],
      }),
   ],
});