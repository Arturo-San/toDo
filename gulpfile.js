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

function scssTask(file){
	console.log(file)
	var plugins = [
			autoprefixer({browsers: ['last 1 version']}),
      cssnano()
    ];
  return src(file, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(dest(file.replace('scss/main.scss','dist'), { sourcemaps: '.' }));
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
  watch('dist/*.html', browsersyncReload);
  //watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
  watch('scss/**/*.scss').on('change', function (path) {
  	scssTask(path);
    browsersync.reload();
  });
}


exports.default = series(
  // scssTask,
  // jsTask,
  browsersyncServe,
  watchTask
);