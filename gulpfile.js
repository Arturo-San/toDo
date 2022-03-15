const { src, dest, watch, series } = require("gulp");
const babel = require("gulp-babel");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();

// gulp.task("default", function () {
//   return gulp.src("src/app.js")
//     .pipe(babel({
//       presets: ["@babel/preset-env"]
//     }))
//     .pipe(gulp.dest("dist"));
// });

function scssTask(){
  console.log('SASS');
	var plugins = [
			autoprefixer({browsers: ['last 1 version']}),
      cssnano()
    ];
  return src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(dest('site/css/'));
}

function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: './site/'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

function watchTask(){
  watch('site/*.html', browsersyncReload);
  //watch(['src/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
  watch(['src/scss/**/*.scss'], series(scssTask, browsersyncReload));
  // watch('scss/**/*.scss').on('change', function (path) {
  // 	scssTask(path);
  //   browsersync.reload();
  // });
  //gulp.watch('./src/sass/**/*.scss', ['scssTask']);
}


exports.default = series(
  // scssTask,
  // jsTask,
  browsersyncServe,
  watchTask
);