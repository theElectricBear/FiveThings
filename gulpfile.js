var gulp = require('gulp'),
	watch = require('gulp-watch'),
	shell = require('gulp-shell'),
	sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'imgsrc': './public//images/**/*',
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}

};


gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});


gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [

  'watch:sass',

]);

//Image Optimization
gulp.task('optimizeImages', function () {
    return gulp.src(paths.imgsrc)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.imgsrc));
});

gulp.task('default', ['watch', 'optimizeImages', 'runKeystone']);
