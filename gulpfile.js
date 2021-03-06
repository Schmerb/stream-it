'use strict'

const gulp        = require('gulp'),
      babel       = require('gulp-babel'),
      browserify  = require('gulp-browserify'),
	  minify      = require('gulp-minify'),
	  minifyCSS   = require('gulp-clean-css'),
	  rename      = require('gulp-rename'),
      concat      = require('gulp-concat');
      


//////////////////////////////////
// - BABEL / Minify / Browserify
/////////////////////////////////

const JS_SRC = ['src/app.js', 'src/data/*.js'];
gulp.task('build_es6', () => {
		return gulp.src(JS_SRC)
		    .pipe(concat('bundle.js'))
			.pipe(babel({
				presets: ['env']
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

//////////////////////////////////
// - CSS minify
/////////////////////////////////

const CSS_SRC = 'src/styles/main.css';
gulp.task('minify_css', () => {
	return gulp.src(CSS_SRC)
		.pipe(minifyCSS())
		.pipe(rename({suffix: '-min'}))
		.pipe(gulp.dest('build'))
});

gulp.task('watch_css', () => {
	gulp.watch(CSS_SRC, ['minify_css']);
})

gulp.task('default', ['build_es6', 'watch_es6', 'minify_css', 'watch_css']);