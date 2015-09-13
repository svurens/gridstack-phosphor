var gulp  = require('gulp'),
    gutil = require('gulp-util');
    typescript = require('gulp-typescript'),
    EventEmitter = require('events').EventEmitter;
    

// create a default task and just log a message
gulp.task('default', function() {
  var project = typescript.createProject({
    "experimentalDecorators": true,
    "declaration": true,
    "noImplicitAny": true,
    "noEmitOnError": true,
    "sourceMap": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "ES5",
    "outDir": "."    
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
