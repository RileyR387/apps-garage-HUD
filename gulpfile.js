'use strict';

const gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  nodemon    = require('nodemon')
;

/**
 * Config
 */
const watchAll = './**/*.{yaml,js,json,ejs,css}';
const rootDest = 'dist/**/*';
const paths = {
  htdocs: {
    src: ['./views/**/*','./static/**/*'],
    dest: 'dist/',
  },
  app: {
    script: 'app.js',
    watch_ext: 'js yaml',
    src:  ['app.js','./config/*.yaml'],
    dest: 'dist/app',
  },
};

/**
 * Tasks
 */
gulp.task('build', async function(){
  console.log("Build not configured :(");
});
gulp.task('serve', function(){
  nodemon({
    'script': paths.app.script,
    'ext': paths.app.watch_ext,
  }).on('start', function() {
    setTimeout(function(){
      livereload.reload();
    }, 500);
  });
});

gulp.task('reload', function(){
  return gulp.src(paths.htdocs.src)
    .pipe(livereload());
});

/**
 * LiveReload Watcher
 */
gulp.task('watch', function(){
  livereload.listen();
	// If we watchAll here, the browser often reloads while the server isn't yet started...
  //gulp.watch(watchAll, gulp.series('reload'))
  gulp.watch(paths.htdocs.src, gulp.series('reload'))
});

/**
 * Default task
 */
gulp.task('default',
  gulp.series(
    'build',
    gulp.parallel('watch', 'serve')
  )
);

