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

function onError (err) {
  gutil.log(err).beep();
}

function vendor () {
  var fs = require('fs');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var Promise = require('promise');

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
      .pipe(gulp.dest(__DIST__ + '/js'))
      .pipe(notify({ title: 'Vendor', message: 'Success', sound: 'Morse' }));
  });
}

function scripts () {
  var browserify = require('browserify');
  var watchify = require('watchify');
  var uglify = require('gulp-uglify');

  var shimify = require('browserify-shim');
  var reactify = require('reactify');
  var es6ify = require('es6ify');

  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    entries: [__SRC__ + '/scripts/main.jsx'],
    extensions: ['.js', '.jsx'],
    debug: __DEBUG__
  });

  function bundle () {
    return bundler
      .transform(reactify)
      .transform(es6ify.configure(/.jsx/))
      .transform(shimify)
      .bundle()
      .on('error', onError)
      .pipe(source('bundle.js'))
      .pipe(__PROD__ ? buffer() : gutil.noop())
      .pipe(__PROD__ ? uglify() : gutil.noop())
      .pipe(gulp.dest(__DIST__ + '/js'))
      .pipe(notify({ title: 'Scripts', message: 'Success', sound: 'Morse' }));
  }

  if (__WATCH__) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }
  
  return bundle();
}

function styles () {
  var sass = require('gulp-sass');
  var minify = require('gulp-minify-css');
  var sourcemaps = require('gulp-sourcemaps');

  function bundle () {
    return gulp.src(__SRC__ + '/styles/main.scss')
      .pipe(__DEBUG__ ? sourcemaps.init() : gutil.noop())
      .pipe(sass())
      .pipe(__PROD__ ? minify() : gutil.noop())
      .pipe(__DEBUG__ ? sourcemaps.write() : gutil.noop())
      .pipe(gulp.dest(__DIST__ + '/css'))
      .pipe(notify({ title: 'Styles', message: 'Success', sound: 'Morse' }));
  }

  if (__WATCH__) {
    gulp.watch(__SRC__ + '/styles/**/*.scss', bundle);
  }

  return bundle();
}

function images () {
  var imagemin = require('gulp-imagemin');

  return gulp.src(__SRC__ + '/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest(__DIST__ + '/img'))
    .pipe(notify({ title: 'Images', message: 'Success', sound: 'Morse' }));
}

function html () {
  var minify = require('gulp-htmlmin');

  function bundle () {
    return gulp.src(__SRC__ + '/html/**/*.html')
      .pipe(__PROD__ ? minify({
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

function clean (c) {
  var del = require('del');

  del([__DIST__], c);
}

function serve () {
  var connect = require('gulp-connect');

  connect.server({ root: __DIST__, port: 8000 });
}

function deploy () {
  var ghpages = require('gulp-gh-pages');

  return gulp.src(__DIST__ + '/**/*')
    .pipe(ghpages())
    .pipe(notify({ title: 'Deploy', message: 'Success', sound: 'Morse' }));
}

gulp.task('vendor', vendor);
gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('images', images);
gulp.task('html', html);
gulp.task('clean', clean);
gulp.task('serve', serve);
gulp.task('deploy', deploy);

gulp.task('build', function () {
  __WATCH__ = false;
  [clean, vendor, scripts, styles, html, images].forEach(function (fn) { fn(); });
});

gulp.task('watch', function () {
  __WATCH__ = true;
  [scripts, styles, html, serve].forEach(function (fn) { fn(); });
});