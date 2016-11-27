import config from '../config';
import gulp from 'gulp';
import gulpDocs from 'gulp-ngdocs';

gulp.task('ngdocs', [], function() {
    var options = {
        loadDefaults: {
            angular: false,
            angularAnimate: false
        },
        /* pass both .min.js and .min.js.map files for angular and angular-animate */
        scripts: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular/angular.min.js.map',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-animate/angular-animate.min.js.map'
        ]
    }

    return gulp.src(config.scripts.src)
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest(config.docs.src));
});