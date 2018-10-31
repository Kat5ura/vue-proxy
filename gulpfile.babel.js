const fs = require('fs');
const gulp = require('gulp');
const {merge} = require('event-stream');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const preprocessify = require('preprocessify');
const gulpif = require('gulp-if');
const webpack = require('webpack-stream');

const getWebpackConfig = require('./build/webpack.config');

const $ = require('gulp-load-plugins')();

var production = process.env.NODE_ENV === "production";
var target = process.env.TARGET || "chrome";
var environment = process.env.NODE_ENV || "development";

var generic = JSON.parse(fs.readFileSync(`./config/${environment}.json`));
var specific = JSON.parse(fs.readFileSync(`./config/${target}.json`));
var context = Object.assign({}, generic, specific);

var manifest = {
    dev: {
        "background": {
            "scripts": [
                "scripts/livereload.js",
                "scripts/background.js"
            ]
        }
    },

    firefox: {
        "applications": {
            "gecko": {
                "id": "my-app-id@mozilla.org"
            }
        }
    }
}

// Tasks
gulp.task('clean', () => {
    return pipe(`./dist/${target}`, $.clean())
})

gulp.task('build', (cb) => {
    $.runSequence('clean', 'styles', 'ext', cb)
});

gulp.task('watch', ['build'], () => {
    $.livereload.listen();

    gulp.watch(['./src/**/*']).on("change", () => {
        $.runSequence('build', $.livereload.reload);
    });
});

gulp.task('default', ['build']);

gulp.task('ext', ['manifest', 'js', 'vue'], () => {
    return mergeAll(target)
});


// -----------------
// COMMON
// -----------------
gulp.task('js', () => {
    return buildJS(target)
})

gulp.task('styles', () => {
    return gulp.src('src/styles/**/*.scss')
        .pipe($.plumber())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe(gulp.dest(`dist/${target}/styles`));
});

gulp.task("manifest", () => {
    return gulp.src('./manifest.json')
        .pipe(gulpif(!production, $.mergeJson({
            fileName: "manifest.json",
            jsonSpace: " ".repeat(4),
            endObj: manifest.dev
        })))
        .pipe(gulpif(target === "firefox", $.mergeJson({
            fileName: "manifest.json",
            jsonSpace: " ".repeat(4),
            endObj: manifest.firefox
        })))
        .pipe(gulp.dest(`./dist/${target}`))
});

gulp.task('vue', () => {
    return buildVue(target, environment)
})

// -----------------
// DIST
// -----------------
gulp.task('dist', (cb) => {
    $.runSequence('build', 'zip', cb)
});

gulp.task('zip', () => {
    return pipe(`./dist/${target}/**/*`, $.zip(`${target}.zip`), './dist')
})


// Helpers
function pipe(src, ...transforms) {
    return transforms.reduce((stream, transform) => {
        const isDest = typeof transform === 'string'
        return stream.pipe(isDest ? gulp.dest(transform) : transform)
    }, gulp.src(src))
}

function mergeAll(dest) {
    return merge(
        pipe('./public/icons/**/*', `./dist/${dest}/icons`),
        pipe(['./public/_locales/**/*'], `./dist/${dest}/_locales`),
        pipe([`./public/images/${target}/**/*`], `./dist/${dest}/images`),
        pipe(['./public/images/shared/**/*'], `./dist/${dest}/images`)
        // pipe(['./public/**/*.html'], `./dist/${dest}`)
    )
}

function buildJS(target) {
    const files = [
        'background.js',
        'contentscript.js',
        'livereload.js'
    ]

    let tasks = files.map(file => {
        return browserify({
            entries: 'src/' + file,
            debug: true
        })
            .transform('babelify', {presets: ['env']})
            .transform(preprocessify, {
                includeExtensions: ['.js'],
                context: context
            })
            .bundle()
            .pipe(source(file))
            .pipe(buffer())
            .pipe(gulpif(!production, $.sourcemaps.init({loadMaps: true})))
            .pipe(gulpif(!production, $.sourcemaps.write('./')))
            .pipe(gulpif(production, $.uglify({
                "mangle": false,
                "output": {
                    "ascii_only": true
                }
            })))
            .pipe(gulp.dest(`dist/${target}/scripts`));
    });

    return merge.apply(null, tasks);
}

function buildVue(target, mode) {
    var start = +new Date
    var config = getWebpackConfig({
        target,
        mode
    });

    return gulp.src('./src/pages/*.js')
        .pipe(webpack(config, null, (err, stat) => {
            console.log(err);
        }))
        .pipe(gulpif(production, $.uglify().on('error', function (err) {
            console.log('[uglify Error]', err.toString());
        })))
        .pipe(gulp.dest(`./dist/${target}/`))
        .on('end', e => {
            var end = +new Date()
            console.log('编译完成，耗时:' + (end - start) + 'ms')
        })
}