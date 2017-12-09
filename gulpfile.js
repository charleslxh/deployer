var gulp = require('gulp');
const del = require('del');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const runSequence = require('run-sequence');
const errorHandler = require('gulp-error-handle');

runSequence.options.ignoreUndefinedTasks = true;

const paths = {
  _clean: {
    src: ['lib/**/*']
  },
  _babel: {
    src: 'src/**/*.js',
    dest: 'lib/'
  }
}

gulp.task('clean', () => del(['dist/**/*', 'lib/**/*']));

gulp.task('babel', () => {
  return gulp.src('src/**/*.js')
    .pipe(errorHandler())
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('./lib/'))
});

gulp.task('build', (callback) => runSequence('clean', 'babel', callback));

gulp.task('default', ['build'], () => {
  gulp.watch('src/**/*.js', ['build']).on('change', (event) => {
    gutil.log(gutil.colors.magenta('File ' + event.path + ' was ' + event.type + ', try rebuild'));
  });
});


