'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');

var __PROD__ = gutil.env.prod || gutil.env.p || false;
var __WATCH__ = gutil.env.watch || gutil.env.w || false;
var __DEBUG__ = gutil.env.debug || gutil.env.d || false;

var __BASE__ = __dirname;
var __SRC__ = __BASE__ + '/app/src';
var __DIST__ = __BASE__ + '/app/dist';

var fs = require('fs');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var Promise = require('promise');

/**
 * Process vendors
 * get the paths from package.json (browser entry)
 * to dist/public/js
 *
 * @function vendor
 */
function vendor () {
  function getPkg () {
    return new Promise(function (resolve, reject) {
      fs.readFile('./package.json', { encoding: 'utf-8' }, function (err, data) {
        if (err) { reject(err); }
        else { resolve(JSON.parse(data)); }
      })
    });
  }

  getPkg().then(function (data) {
    var paths = Object.keys(data.browser || {}).map(function (key) {
      return data.browser[key];
    });

    return gulp.src(paths)
      .pipe(concat('vendor.js'))
      .pipe(__PROD__ ? uglify() : gutil.noop())
      .pipe(gulp.dest(__DIST__ + '/public/js'))
      .pipe(notify({ title: 'Vendor', message: 'Success', sound: 'Morse' }));
  });
}

var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');

var shimify = require('browserify-shim');
var reactify = require('reactify');
var es6ify = require('6to5ify');

/**
 * Process scripts
 * from src/scripts to dist/public/js
 *
 * @function scripts
 */
function scripts () {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    entries: [__SRC__ + '/scripts/main.jsx'],
    extensions: ['.js', '.jsx'],
    debug: __DEBUG__
  });

  bundler.transform(reactify)
    .transform(es6ify)
    .transform(shimify);

  function bundle () {
    return bundler.bundle()
      .on('error', function (err) {
        gutil.log(err).beep();
        this.end();
      })
      .pipe(source('bundle.js'))
      .pipe(__PROD__ ? buffer() : gutil.noop())
      .pipe(__PROD__ ? uglify() : gutil.noop())
      .pipe(gulp.dest(__DIST__ + '/public/js'))
      .pipe(notify({ title: 'Scripts', message: 'Success', sound: 'Morse' }));
  }

  if (__WATCH__) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }
  
  return bundle();
}

var less = require('gulp-less');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

/**
 * Process less
 * from src/styles to dist/public/css
 *
 * @function styles
 */
function styles () {
  function bundle () {
    return gulp.src(__SRC__ + '/styles/main.less')
      .pipe(__DEBUG__ ? sourcemaps.init() : gutil.noop())
      .pipe(less().on('error', function (err) {
        gutil.log(err).beep();
        this.end();
      }))
      .pipe(__PROD__ ? minify() : gutil.noop())
      .pipe(__DEBUG__ ? sourcemaps.write() : gutil.noop())
      .pipe(gulp.dest(__DIST__ + '/public/css'))
      .pipe(notify({ title: 'Styles', message: 'Success', sound: 'Morse' }));
  }

  if (__WATCH__) {
    gulp.watch(__SRC__ + '/styles/**/*.less', bundle);
  }

  return bundle();
}

/**
 * Process html
 * from src/html to dist
 *
 * @function html
 */
function html () {
  function bundle () {
    return gulp.src(__SRC__ + '/html/**/*.html')
      .pipe(__PROD__ ? htmlminify({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
      }) : gutil.noop())
      .pipe(gulp.dest(__DIST__))
      .pipe(notify({ title: 'Html', message: 'Success', sound: 'Morse' }));
  }

  if (__WATCH__) {
    gulp.watch(__SRC__ + '/html/**/*.html', bundle);
  }

  return bundle();
}

var imagemin = require('gulp-imagemin');

/**
 * Minify & copy images
 * from src/assets/images to dist/public/img
 *
 * @function method images
 */
function images () {
  return gulp.src(__SRC__ + '/assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest(__DIST__ + '/public/img'))
    .pipe(notify({ title: 'Images', message: 'Success', sound: 'Morse' }));
}

var htmlminify = require('gulp-htmlmin');

/**
 * Copy assets except images
 * from src/assets to dist/public
 *
 * @function assets
 */
function assets () {
  gulp.src([
      __SRC__ + '/assets/**/*.*',
      '!' + __SRC__ + '/assets/images/**/*.*'
    ], { base: __SRC__ + '/assets' })
    .pipe(gulp.dest(__DIST__ + '/public'));
}

/**
 * Clean dist folder
 *
 * @function clean
 */
function clean (c) {
  var del = require('del');

  del([__DIST__], c);
}

var connect = require('gulp-connect');

/**
 * Serve static content from dist on port 8000
 *
 * @function serve
 */
function serve () {
  connect.server({ root: __DIST__, port: 8000 });
}

var ghpages = require('gulp-gh-pages');

/**
 * Deploy dist to gh-pages
 *
 * @function deploy
 */
function deploy () {
  return gulp.src(__DIST__ + '/**/*')
    .pipe(ghpages())
    .pipe(notify({ title: 'Deploy', message: 'Success', sound: 'Morse' }));
}

gulp.task('vendor', vendor);
gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('images', images);
gulp.task('html', html);
gulp.task('assets', assets);
gulp.task('clean', clean);
gulp.task('serve', serve);
gulp.task('deploy', deploy);

gulp.task('build', function () {
  __WATCH__ = false;
  [clean, vendor, scripts, styles, html, images, assets].forEach(function (fn) { fn(); });
});

gulp.task('watch', function () {
  __WATCH__ = true;
  [scripts, styles, html, serve].forEach(function (fn) { fn(); });
});