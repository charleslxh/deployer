var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');

var paths = {
  _clean: {
    src: ['lib/**/*']
  },
  _babel: {
    src: 'src/**/*.js',
    dest: 'lib/'
  }
}

gulp.task('clean', function() {
  return del(['dist/**/*', 'lib/**/*']);
});

gulp.task('babel', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('./lib/'))
});

gulp.task('build', function(callback) {
  runSequence('clean', 'babel', callback);
});

gulp.task('default', ['build'], function() {
  gulp.watch('src/**/*.js', ['build']).on('change', function(event) {
    gutil.log(gutil.colors.magenta('File ' + event.path + ' was ' + event.type + ', try rebuild'));
  });
});


