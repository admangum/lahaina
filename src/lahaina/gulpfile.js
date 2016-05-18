var gulp = require('gulp'),
	gutil = require('gulp-util'),
	maps = require('gulp-sourcemaps'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	reactify = require('reactify'),
	assign = require('lodash.assign'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	rename = require('gulp-rename'),
	babel = require('gulp-babel'),
	webpack = require('webpack-stream'),
	paths,
	opts,
	bundler;

paths = {
	src: {
		less: 'src/less/'
	},
	build: {
		dir: './dist/',
		css: '.'
	}
};

gulp.task('build', function(){
	return gulp.src('./src/main.js')
		.pipe(webpack(require('./webpack.config.js')).on('error', function(err){ console.log(err)}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function(){
	gulp.src('./src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
		.pipe(gulp.dest('./dist'));
});

gulp.task('deploy', ['build', 'sass'], function(){
	return gulp.src(['./dist/**/*.js', './dist/**/*.js.map', './dist/style.css'])
		.pipe(gulp.dest('../../www/wp-content/themes/lahaina/'));
});

gulp.task('watch', ['deploy'], function(){
	// gulp.watch('./dist/**/*', ['deploy']);
	// gulp.watch('./src/**/*.scss', ['sass']);
	// gulp.watch('./src/**/*.js', ['build']);
	gulp.watch('./src/**/*', ['deploy']);
});

gulp.task('dev', ['watch']);




