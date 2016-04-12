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

opts = assign({}, watchify.args, {
	entries: ['./src/main.js'],
	debug: true
});

bundler = watchify(browserify(opts));
bundler
	.on('update', bundle)
	.on('log', gutil.log);


function bundle(){
	return bundler.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(maps.init({loadMaps: true}))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(paths.build.dir));
}

gulp.task('browserify', bundle);

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
});

gulp.task('dev', ['watch', 'browserify']);




