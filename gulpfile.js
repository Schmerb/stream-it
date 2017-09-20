'use strict'

const gulp        = require('gulp'),
      babel       = require('gulp-babel'),
      browserify  = require('gulp-browserify'),
      minify      = require('gulp-minify'),
      concat      = require('gulp-concat');
      


//////////////////////////////////
// - BABEL / Minify / Browserify
/////////////////////////////////
 
gulp.task('build_es6', () => {
	gulp.watch([['app.js', 'data/*.js']], () => {
		return gulp.src(['app.js', 'data/*.js'])
		    .pipe(concat('bundle.js'))
			.pipe(babel({
				presets: ['env'],
				plugins: [
					'transform-object-assign',
					['transform-runtime', {
						"helpers": false,
						"polyfill": true,
						"regenerator": true,
						"moduleName": "babel-runtime"
					}]
				]
			}))
			.pipe(browserify({
				insertGlobals: true
			}))
			.pipe(minify({
				min: '.js'
			}))
			.pipe(gulp.dest('build'))
	});
});

gulp.task('default', ['build_es6']);