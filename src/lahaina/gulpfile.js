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

// opts = assign({}, watchify.args, {
// 	entries: ['./src/main.js'],
// 	debug: true
// });

// bundler = watchify(browserify(opts));
// bundler = browserify({
// 	entries: ['./src/main.js'],
// 	debug: true
// });
// bundler
// 	.on('update', bundle)
// 	.on('log', gutil.log);


// function bundle(){
// 	return bundler
// 		// .transform('babelify', {presets: ['es2015']})
// 		.transform('reactify', {es6: true})
// 		.bundle()
// 		// .on('error', gutil.log.bind(gutil, 'Browserify Error'))
// 		.pipe(source('bundle.js'))
// 		// .pipe(buffer())
// 		// .pipe(maps.init())
// 		// .pipe(maps.write('./'))
// 		.pipe(gulp.dest('./dist/'));
// }

// gulp.task('browserify', bundle);

gulp.task('build', function(){
	return gulp.src('./src/main.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function(){
	gulp.src('./src/style/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist'));
});

gulp.task('deploy', function(){
	return gulp.src('./dist/**/*')
		.pipe(gulp.dest('../../www/wp-content/themes/lahaina/'));
});

gulp.task('watch', function(){
	gulp.watch('./dist/**/*', ['deploy']);
	gulp.watch('./src/style/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('dev', ['watch']);




