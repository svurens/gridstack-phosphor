var gulp  = require('gulp'),
    gutil = require('gulp-util');
    typescript = require('gulp-typescript'),
    EventEmitter = require('events').EventEmitter;
    

// create a default task and just log a message
gulp.task('default', function() {
  var project = typescript.createProject({
      declarationFiles: false,
      noImplicitAny: true,
      module: "commonjs",
      target: 'ES5',
    });

    var sources = [
      'testsrc.ts'
    ];

  return gulp.src(sources)
    .pipe(typescript(project))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch('*.ts', ['default']);
});
