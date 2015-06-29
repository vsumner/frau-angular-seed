'use strict';

var publishOptions = {
	id: '[REPLACEMENT_ID]',
	creds: {
		key: '[REPLACEMENT_KEY]',
		secret: process.env.S3_SECRET
	},
	devTag: process.env.TRAVIS_COMMIT,
	version: process.env.TRAVIS_TAG
};

var frau = require('free-range-app-utils'),
	gulp = require('gulp'),
	pg = require('peanut-gallery'),
	publisher = require('gulp-frau-publisher').app(publishOptions),
	ngHtml2Js = require("gulp-ng-html2js"),
	minifyHtml = require("gulp-minify-html"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat");
	
var	appFilename = 'app.js',
	localAppResolver = frau.localAppResolver();
	
function getTarget() {
	return (process.env.TRAVIS === 'true') ? publisher.getLocation()
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
		.pipe( publisher.getStream() )
		.on( 'end', function() {
			var message = '[Deployment available online](' + publisher.getLocation() + appFilename + ')';

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