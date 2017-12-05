'use strict'

const gulp        = require('gulp'),
      babel       = require('gulp-babel'),
      browserify  = require('gulp-browserify'),
      minify      = require('gulp-minify'),
      concat      = require('gulp-concat');
      


//////////////////////////////////
// - BABEL / Minify / Browserify
/////////////////////////////////

const JS_SRC = ['src/app.js', 'src/data/*.js'];
gulp.task('build_es6', () => {
		return gulp.src(JS_SRC)
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

gulp.task('watch_es6', () => {
	gulp.watch(JS_SRC, ['build_es6']);
})

gulp.task('default', ['build_es6', 'watch_es6']);