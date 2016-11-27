import config from '../config';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
//import path from 'path';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import handleErrors from '../util/handleErrors';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';


//var aliases = {};

/**
 * Will look for .scss|sass files inside the node_modules folder
 */
/*function npmModule(url, file, done) {
    // check if the path was already found and cached
    if (aliases[url]) {
        return done({
            file: aliases[url]
        });
    }

    // look for modules installed through npm
    try {
        var newPath = path.relative(config.styles.dest, require.resolve(url));
        aliases[url] = newPath; // cache this request
        return done({
            file: newPath
        });
    } catch ( e ) {
        // if your module could not be found, just return the original url
        aliases[url] = url;
        return done({
            file: url
        });
    }
}*/

gulp.task('styles', function() {

    const createSourcemap = !global.isProd || config.styles.prodSourcemap;

    return gulp.src(config.styles.src)
        .pipe(gulpif(createSourcemap, sourcemaps.init()))
        .pipe(sassGlob())
        .pipe(sass({
            sourceComments: !global.isProd,
            outputStyle: global.isProd ? 'compressed' : 'nested',
            includePaths: config.styles.sassIncludePaths
        //,importer: npmModule
        }))
        .on('error', handleErrors)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 8']
        }))
        .pipe(gulpif(
            createSourcemap,
            sourcemaps.write(global.isProd ? './' : null))
    )
        .pipe(gulp.dest(config.styles.dest))
        .pipe(browserSync.stream());

});
