var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
    return gulp.src('./*.scss')
        .pipe(sass().on('error', function (e) {
            console.log(e.message);
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('babel', function () {
    return gulp.src('*.es6')
        .pipe(babel().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest('./js/'));
});

gulp.task('jshint', function () {
    gulp.src('*.js')
        .pipe(jshint().on('error', function (e) {
            console.log(e);
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('load', function () {
    livereload.changed('modal.html');
});

gulp.task('live', function () {
    livereload.listen();
    gulp.watch('*.*', function () { //不太妥当
        gulp.run('babel');
        livereload.reload('modal.html');
    });
});

gulp.task('default', function () {
    gulp.run('sass', 'babel', 'jshint', 'live');
});