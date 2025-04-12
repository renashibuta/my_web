//変更前(CommonJS)
const { src, dest, watch, series } = require("gulp");

// 変更後（ESM）
//import gulp from 'gulp';

//変更前
//const { src, dest, watch, series } = gulp;
const browserify = require("browserify");
const tsify = require("tsify");
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const path = require('path');
const logSymbols = require('log-symbols');
const del = require('del');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const babelify = require("babelify");

// //変更後
// // ESMに対応したimport文の例
// import browserify from 'browserify';
// import tsify from 'tsify';
// import sourcemaps from 'gulp-sourcemaps';
// import source from 'vinyl-source-stream';
// import buffer from 'vinyl-buffer';
// import path from 'path';
// import logSymbols from 'log-symbols';
// import del from 'del';
// import pug from 'gulp-pug';
// import gulpSass from 'gulp-sass';
// import dartSass from 'sass';
// import postcss from 'gulp-postcss';
// import concat from 'gulp-concat';
// import cssnano from 'gulp-cssnano';
// import autoprefixer from 'gulp-autoprefixer';
// import imagemin from 'gulp-imagemin';
// import browserSyncLib from 'browser-sync';
// import babelify from 'babelify';
// //const babelify = require("babelify");//追加
// const sass = gulpSass(dartSass);
// const browserSync = browserSyncLib.create();



const options = {
  config: {
    tailwindjs: "./tailwind.config.js",
    port: 6789
  },
  paths: {
    root: "/",
    source: "src",
    build: "build"
  }
}
//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.build
    },
    port: options.config.port || 9000
  });
  done();
}
// Triggers Browser reload
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}


// Production
function prodClean() {
  console.log("\n\t" + logSymbols.info, "Cleaning build folder for fresh start.\n");
  return del([options.paths.build]);
}
function runPug() {
  return src([`${options.paths.source}/pages/**/*.pug`, `!${options.paths.source}/pages/{common,common/**}`, `!${options.paths.source}/pages/{components,components/**}`]).pipe(pug({ pretty: true, basedir: path.resolve(__dirname, './src/pages') })).pipe(dest(options.paths.build));
}
function styles() {
  const tailwindcss = require('tailwindcss');
  return src(`${options.paths.source}/scss/**/*.scss`).pipe(sass().on('error', sass.logError))
    .pipe(dest(`${options.paths.source}/scss/`))
    .pipe(postcss([
      tailwindcss(options.config.tailwindjs),
      require('autoprefixer'),
      require('cssnano')({
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      })
    ]))
    .pipe(cssnano({
      convertValues: {
        length: false
      },
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(concat({ path: 'style.css' }))
    .pipe(autoprefixer())
    .pipe(dest(options.paths.build));
}

function scripts() {
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/main.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle().on('error', function (err) {
      // print the error (can replace with gulp-util)
      console.log(err.message);
      // end this stream
      this.emit('end');
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(options.paths.build));
}
function images() {
  return src(`${options.paths.source}/assets/img/**/*`).pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 90, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: true },
        { cleanupIDs: false }
      ]
    })
  ])).pipe(dest(options.paths.build + "/img/"));
}
function docs() {
  return src(`${options.paths.source}/assets/doc/**/*`).pipe(dest(options.paths.build + "/doc/"));
}
function files() {
  return src(`${options.paths.source}/assets/files/**/*`).pipe(dest(options.paths.build + "/files/"));
}
function jsScript() {
  return src(`${options.paths.source}/js/**/*.js`).pipe(dest(options.paths.build));
}
function watchChanges() {
  watch(`${options.paths.source}/pages/**/*.pug`, series(runPug, styles, previewReload));
  watch([options.config.tailwindjs, `${options.paths.source}/scss/**/*.scss`], series(styles, previewReload));
  watch(`${options.paths.source}/ts/**/*.ts`, series(styles, scripts, previewReload));
  watch(`${options.paths.source}/js/**/*.js`, series(jsScript, previewReload));
  watch(`${options.paths.source}/assets/img/**/*`, series(images, previewReload));
  watch(`${options.paths.source}/assets/doc/**/*`, series(docs, previewReload));
  watch(`${options.paths.source}/assets/files/**/*`, series(files, previewReload));
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}
exports.default = series(prodClean, docs, files, images, scripts, styles, runPug, livePreview, watchChanges)
exports.prod = series(prodClean, docs, files, images, styles, scripts, runPug)






