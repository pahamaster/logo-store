const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload=browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo=require('gulp-svgo');
const svgSprite=require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env=process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => {
  //console.log(env);
  return src(['dist/**/*'], { read: false })
    .pipe(rm())
})

task('copy:fonts', ()=>{
  return src('src/fonts/*.woff2').pipe(dest('dist/fonts'));
})

task('copy:html', () => {
  return src('src/*.html').pipe(dest('dist')).
  pipe(gulpif(env==="dev", reload({stream: true})));
});

const imgFiles=[
  'src/img/*.png',
  'src/img/*.svg',
  'src/img/*.jpg'
  //'src/img/*.webp'
];

task('copy:img', () => {
  return src(imgFiles).pipe(dest('dist/img')).
  pipe(gulpif(env==="dev", reload({stream: true})));
});

const styles=[
  "node_modules/normalize.css/normalize.css",
  //"node_modules/bxslider/dist/jquery.bxslider.css",
  "src/styles/main.scss"
]

task('styles', () => {
  return src(styles)
  .pipe(gulpif(env==="dev", sourcemaps.init()))
  .pipe(concat("main.min.scss"))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  //.pipe(px2rem())
  .pipe(gulpif(env==="dev", autoprefixer({
    grid: true,
    //browserslist: ["last 2 versions"],
    cascade: false
  })))
  .pipe(gulpif(env==="prod", gcmq()))
  .pipe(gulpif(env==="prod", cleanCSS()))
  .pipe(gulpif(env==="dev", sourcemaps.write()))
  .pipe(dest('dist'));
  //.pipe(gulpif(env==="dev", reload({stream: true})));
});

task('concat:css', ()=>{
  return src(["dist/main.min.css", "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css"])
  .pipe(concat("main.min.css"))
  .pipe(dest('dist'))
  .pipe(gulpif(env==="dev", reload({stream: true})));
})

const libs=[
  "node_modules/jquery/dist/jquery.js",
  "node_modules/bxslider/dist/jquery.bxslider.js",
  "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
  "node_modules/mobile-detect/mobile-detect.js",
  "node_modules/jquery-touchswipe/jquery.touchSwipe.js",
  "src/main.js",
  "src/scripts/*.js"
]

task('scripts',()=>{
  return src(libs)
  .pipe(gulpif(env==="dev", sourcemaps.init()))
  .pipe(concat("main.min.js", {newLine: ";"}))
  .pipe(gulpif(env==='prod', babel({
    presets: ['@babel/preset-env']
  })))
  .pipe(gulpif(env==="prod", uglify()))
  .pipe(gulpif(env==="dev", sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(gulpif(env==="dev", reload({stream: true})));
})

task("icons", ()=>{
  return src('src/img/icons/*.svg')
    .pipe(svgo({
      plugins:[
        {
          //removeDimensions:{},
          //removeTitle:{},
          //removeStyleElement:{},
          //removeUselessStrokeAndFill:{},
          removeAttrs:{
            attrs: '(fill|stroke|style|data.*)'
          }
        }

      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../../sprite.svg"
        }
      }
    }))
    .pipe(dest("dist/img"));
})

task('server', ()=> {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
});

task ("watch", ()=>{
  watch('./src/styles/**/*.scss', series('styles','concat:css'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/*.svg', series('icons'));
});


task(
  "default", 
  series(
    "clean", 
    "styles", 
    parallel("copy:html", "copy:img", "copy:fonts", "concat:css", "scripts", "icons"),
    parallel("watch", "server")
  )
); 

task(
  "build", 
  series(
    "clean", 
    "styles", 
    parallel("copy:html", "copy:img", "concat:css", "scripts", "icons"),
    "server"
  )
); 