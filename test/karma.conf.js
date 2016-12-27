const istanbul = require('browserify-istanbul');
const isparta = require('isparta');

const karmaBaseConfig = {

    basePath: '../',

    singleRun: true,

    frameworks: ['jasmine', 'browserify'],

    preprocessors: {
        'app/js/**/*.js': ['browserify', 'coverage'],
        'test/**/*.js': ['browserify']
    },

    browsers: ['Chrome'],

    reporters: ['progress', 'coverage'],

    autoWatch: true,

    browserify: {
        debug: true,
        extensions: ['.js'],
        transform: [
            'babelify',
            'browserify-ngannotate',
            'bulkify',
            istanbul({
                instrumenter: isparta,
                ignore: ['**/node_modules/**', '**/test/**']
            })
        ]
    },

    proxies: {
        '/': 'http://localhost:9876/'
    },

    urlRoot: '/__karma__/',

    files: [
        // app-specific code
        'app/js/main.js',

        // 3rd-party resources
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/angular-sanitize/angular-sanitize.js',

        // test files
        'test/unit/**/*.js'
    ]

};

const customLaunchers = {
    Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
    }
};

const ciAdditions = {
    browsers: ['Chrome', 'ChromeCanary'],
    customLaunchers: customLaunchers
};

module.exports = function(config) {
const isCI = process.env.CI && Boolean(process.env.TRAVIS_PULL_REQUEST);
config.set(isCI ? Object.assign(karmaBaseConfig, ciAdditions) : karmaBaseConfig);
};
