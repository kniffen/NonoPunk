const gulp    = require('gulp')
const plumber = require('gulp-plumber')
const bro     = require('gulp-bro')
const babelify = require('babelify')

gulp.task('js', function() {
  gulp.src('src/app.js')
    .pipe(plumber())
    .pipe(bro({
      transform: [
        babelify.configure({ presets: ['latest']})
      ]
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.*', {cwd: './'}, ['js'])
})

gulp.task('default', ['watch', 'js'])