var es = require('event-stream')
var gutil = require('gulp-util')
var assert = require('assert')
var fs = require('fs')
var gunzip = require('./index')

describe('gulp-gunzip', function () {
  context('in streaming mode', function () {
    it('should unzip files', function (done) {
      var stream = gunzip()

      stream.once('data', function (file) {
        file.contents.pipe(es.wait(function (err, data) {
          assert.equal(data, 'File 1\n')
          assert.equal(file.path, './fixtures/test.txt')
          done()
        }))
      })

      stream.write(new gutil.File({
        path: './fixtures/test.txt.gz',
        contents: fs.createReadStream('./fixtures/test.txt.gz')
      }))

      stream.end()
    })

  })

  context('in buffer mode', function () {
    it('should gunzip files', function (done) {
      var stream = gunzip()

      stream.once('data', function (file) {
        assert.equal(file.contents, 'File 1\n')
        assert.equal(file.path, './fixtures/test.txt')
        done()
      })

      stream.write(new gutil.File({
        path: './fixtures/test.txt.gz',
        contents: fs.readFileSync('./fixtures/test.txt.gz')
      }))

      stream.end()
    })
  })

  context('null files', function () {
    it('should let them pass through', function (done) {
      var stream = gunzip()

      stream.on('data', function (file) {
        assert.equal(file.path, './fixtures/test.txt.gz')
        done()
      })

      stream.write(new gutil.File({
        path: './fixtures/test.txt.gz',
        contents: null
      }))
    })
  })
})
