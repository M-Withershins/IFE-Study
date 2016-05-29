var gulp = require('gulp')
livereload = require('gulp-livereload')
sass = require('gulp-sass'),
    babel = require('gulp-babel');

gulp.task('sass', function () {
    gulp.src('*.scss')
        .pipe(sass()).on('error', function (e) {
            console.log(e);
        })
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});

gulp.task('babel', function () {
    return gulp.src('*.es6')
        .pipe(babel().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});

gulp.task('live', function () {
    livereload.listen();
    gulp.watch('*.*', function () { //不太妥当
        gulp.run('sass', 'babel');
        livereload.reload('index.html');
    });
});

gulp.task('default', function () {
    gulp.run('sass', 'babel', 'live');
});