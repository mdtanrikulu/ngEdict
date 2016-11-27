import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

    global.isProd = false;

    runSequence(['styles', 'images', 'fonts', 'views', 'ngdocs', 'connect_ngdocs'], 'browserify', 'watch', cb);

});
