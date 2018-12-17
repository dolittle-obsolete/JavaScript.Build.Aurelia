const AureliaPlugin = require('aurelia-webpack-plugin').AureliaPlugin;
const DefinePlugin = require('webpack').DefinePlugin;

const wallaby = require('@dolittle/build/wallaby')
const setupFile = 'node_modules/@dolittle/build.aurelia/aureliaSetup.js';

module.exports = (baseFolder, webpackPostprocessorCallback, wallabySetingsCallback) => {
    if( !baseFolder ) baseFolder = 'features';
    return wallaby(baseFolder, webpack => {

        webpack.entryPatterns.unshift(setupFile);
        webpack.module.rules = webpack.module.rules.concat([
            { test: /\.html$/i, loader: 'html-loader' },
            { test: /\.css$/i, issuer: [{ not: [{ test: /\.html$/i }] }], use: ['style-loader', 'css-loader'] },
            { test: /\.css$/i, issuer: [{ test: /\.html$/i }], use: 'css-loader' },   
        ]);
    
        webpack.plugins = webpack.plugins.concat([
            new DefinePlugin({ AURELIA_WEBPACK_2_0: undefined }),
            new AureliaPlugin()
        ]);

        if( typeof webpackPostprocessorCallback == 'function' ) webpackPostprocessorCallback(webpack);

    }, wallaby => {
        wallaby.files.push({ pattern: setupFile, load: false });

        if( typeof wallabySetingsCallback == 'function' ) wallabySetingsCallback(wallaby);
    });
};

