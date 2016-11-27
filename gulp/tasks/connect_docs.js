import gulp from 'gulp';
import connect from 'gulp-connect';

gulp.task('connect_ngdocs', function() {
    connect.server({
        root: 'docs',
        livereload: false,
        fallback: 'docs/index.html',
        port: 8083
    });
});