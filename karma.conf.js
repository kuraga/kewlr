var buble = require('rollup-plugin-buble');
var multi = require('rollup-plugin-multi-entry');
var typeScript = require('rollup-plugin-typeScript');
var ts = require('typeScript');

module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],

        basePath: './',

        files: [
            'test/browser/**/*.ts'
        ],

        preprocessors: {
            'src/**/*.js': ['rollup'],
            'test/browser/**/*.ts': ['rollup']
        },

        rollupPreprocessor: {
            rollup: {
                plugins: [
                    multi(),
                    typeScript({
                        typescript: ts
                    }),
                    buble({
                        plugins: []
                    })
                ]
            },
            bundle: {
                intro: '(function() {',
                outro: '})();',
                sourceMap: 'inline'
            }
        },
        browsers: ['Chrome', 'Firefox'],

        reporters: ['mocha'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        autoWatch: false,

        singleRun: true,
        // change Karma's debug.html to the mocha web reporter
        client: {
            mocha: {
                reporter: 'html'
            }
        }
    })
};