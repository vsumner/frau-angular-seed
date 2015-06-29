"use strict";

module.exports = function(config) {
	config.set({

		coverageReporter: {
			dir : './test/coverage',
			reporters: [
				{ type: 'html', subdir: 'html' },
				{ type: 'lcov', subdir: 'lcov' }
			]
		},

		browserify:{
			extensions: ['.js'],
			transform: [['browserify-istanbul', { ignore: ['**/bower_components/**','**/lib/**'], defaultIgnore:true}]]
		},
		// There's a pre-test stall on Travis builds that can cause Karma to
		//  fail with the default timeout of 10s.  I'm not sure what's causing
		//  the stall, but this mitigates it for now.
		browserNoActivityTimeout: 30000,

	    // start these browsers
	    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],

    	// list of files / patterns to load in the browser
		files: [
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-loader/angular-loader.min.js',
			'bower_components/angular-route/angular-route.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'test/unit/*.TestSpec.js',
      		'src/**/*.html'
		],

	    // frameworks to use
	    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['browserify', 'jasmine'],

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

	    // web server port
		port: 9876,

	    // preprocess matching files before serving them to the browser
	    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
      		'src/**/*.html': ['ng-html2js'],
			'test/unit/*.TestSpec.js': [ 'browserify' ],
      		'src/**/*.js': [ 'coverage' ]
		},

	    ngHtml2JsPreprocessor: {
	      stripPrefix: 'src/',
	      moduleName: 'templates'
	    },

	    // test results reporter to use
	    // possible values: 'dots', 'progress'
	    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters : ['progress', 'coverage'],

	    // Continuous Integration mode
	    // if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};