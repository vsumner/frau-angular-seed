'use strict';

var publishOptions = {
	id: 'frau-angular-seed',
	creds: {
		key: '[TEMP]',
		secret: process.env.S3_SECRET
	},
	devTag: process.env.TRAVIS_COMMIT,
	version: process.env.TRAVIS_TAG
};

var frau = require('free-range-app-utils'),
	gulp = require('gulp'),
	pg = require('peanut-gallery'),
	publisher = require('gulp-frau-publisher'),
	ngHtml2Js = require("gulp-ng-html2js"),
	minifyHtml = require("gulp-minify-html"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat");
	
var	appFilename = 'app.js',
	localAppResolver = frau.localAppResolver(),
	appPublisher = publisher.app( publishOptions );
	
function getTarget() {
	return (process.env.TRAVIS === 'true') ? appPublisher.getLocation()
		: localAppResolver.getUrl();
}

gulp.task('appconfig', function() {
	var target = getTarget();
	return frau.appConfigBuilder.buildStream( target + appFilename )
		.pipe( gulp.dest('dist') );
});

gulp.task('appresolver', function() {
	localAppResolver.host();
});

gulp.task( 'publish-release', function( cb ) {
	gulp.src('./dist/**')
		.pipe( appPublisher.getStream() )
		.on( 'end', function() {
			var message = '[Deployment available online](' + appPublisher.getLocation() + appFilename + ')';

			pg.comment( message, {}, function( error, response ) {
				if( error )
					return cb( JSON.stringify( error ) );
				cb();
			} );

		} );
});

gulp.task('html2js',function(){
  return gulp.src("./src/**/*.html").
            pipe(minifyHtml({
              empty: true,
              spare: true,
              quotes: true
            })).
            pipe(ngHtml2Js({
              moduleName: "frau.templates",
              prefix: ""
            })).
            pipe(concat("views.min.js")).
            pipe(uglify()).
            pipe(gulp.dest("./dist"));
});

gulp.task( 'copy-resources-to-dist', function() {
	return gulp.src( './src/resources/**/*.*' )
		.pipe( gulp.dest( 'dist/resources' ) );
} );