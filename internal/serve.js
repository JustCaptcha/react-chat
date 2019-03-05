process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
require('@babel/polyfill');
require('@babel/register')({
    presets: [
        '@babel/preset-env',
    ],
    plugins: [
        '@babel/plugin-transform-async-to-generator',
        // '@babel/plugin-syntax-object-rest-spread',
        // '@babel/plugin-transform-spread', // I don't think we'll need it anymore
        '@babel/plugin-proposal-object-rest-spread',
    ]
});

module.exports = require('../server/server');