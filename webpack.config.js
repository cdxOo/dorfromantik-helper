'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './web'),
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    // FIXME: if i leave this out babel leader
                    // complains about 'jsx not being enabled'
                    // so i suspect the config in package json is not
                    // applied for some reason
                    // https://stackoverflow.com/q/62703393/1158560
                    // we might want to move to babel.config.js
                    // so idk
                    options: {
                        presets: [
                          [
                            "@babel/preset-react",
                            {}
                          ],
                          [
                            "@babel/preset-env",
                            {
                              "targets": "> 0.25%, not dead"
                            }
                          ]
                        ]
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/template.html'),
            title: 'demo',
        }),
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8080,
    },
};
