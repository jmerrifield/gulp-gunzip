# gulp-gunzip

[![NPM version](https://badge.fury.io/js/gulp-gunzip.svg)](http://badge.fury.io/js/gulp-gunzip)

Uncompress gzip files in your [gulp](http://gulpjs.com) build pipeline

## Install

```bash
$ npm install --save-dev gulp-gunzip
```

## Usage

```js
var gulp = require('gulp')
var gunzip = require('gulp-gunzip')

gulp.task('uncompress', function () {
  return gulp.src('./compressed/*.gz')
    .pipe(gunzip())
    .pipe(gulp.dest('./uncompressed'))
})
```

In combination with [gulp-download](https://github.com/Metrime/gulp-download)
and [gulp-untar](https://github.com/jmerrifield/gulp-untar):

```js
var gulp = require('gulp')
var download = require('gulp-download')
var gunzip = require('gulp-gunzip')
var untar = require('gulp-untar')

gulp.task('default', function () {
  return download('http://example.org/some-file.tar.gz')
  .pipe(gunzip())
  .pipe(untar())
  .pipe(gulp.dest('output'))
})
```

## License

[MIT](http://opensource.org/licenses/MIT)

© [Jon Merrifield](http://www.jmerrifield.com)
