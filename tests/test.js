var should = require('should');
var thumb = require("../index.js");

describe('Array', function(){
  describe('all in one method, (autopipe source until destination)', function(){

    it('blur and resize, should be done', function(done){
      thumb.to({
        source:'samples/test.jpg',
        destination: 'samples/test-blur-resize.jpg',
        size: '240x240',
        done: done,
        blur: 2,
      }).execSync();

    });


    it('just resize with size input, should be done', function(done){
      thumb.to({
        source:'samples/test.jpg',
        destination: 'samples/test-just-resize.jpg',
        done: done,
        size: '120x250'
      }).execSync();

    });

    it('without source path, should be done', function(done){

      var input = thumb.read({source: "samples/test.jpg"}).execSync();
      input
        .pipe(
          thumb.to({
            destination: 'samples/test-with-dest.jpg',
            size: '240x240',
            done: done,
            blur: 2,
          }).execSync()
        )

    });

    it('without destination path, should be done', function(done){

      var output = thumb.write({destination: "samples/test-with-source.jpg"}).execSync();
      thumb.to({
          source: 'samples/test.jpg',
          size: '240x240',
          blur: 2,
        }).execSync()
          .pipe( output )
          .on('close', done);

    });

  });

  describe('Method with pipe', function(){
    it('blur, should be done', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-blur.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({blur: 5}).execSync() )
        .pipe( output )
        .on('close', done);

    });

    it('crop an resize, should be done', function(done){
      var params = {
    		source: "samples/test.jpg",
    		destination: "samples/test-resize.jpg"
    	};
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      var test = thumb.to({
      	width: 100,
      	height: 80,
      	quality: 80
      }).execSync();

      input
        .pipe(test)
        .pipe(output)
        .on('close', done);

    });

    it('flip, should be done', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-flip.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      var test = thumb.to({
        flip: true,
        quality: 25
      }).execSync();

      input
        .pipe(test)
        .pipe(output)
        .on('close', done);

    });
  });

  describe('test with same value, inthe same order, Multiple pipe ', function(){

    it('mirror 1(all in one method), should be done', function(done){
      thumb.to({
        source:'samples/test.jpg',
        destination: 'samples/test-mirror-1.jpg',
        done: done,
        blur: 5,
        size:'800x600',
        flip: true,
        rotate: 180
      }).execSync();

    });

    it('mirror-2 faster, Interesting it\'s not the same blur like other mirrors, should be done', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-mirror-2.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({size:'800x600'}).execSync() )
        .pipe( thumb.to({blur: 5}).execSync() )
        .pipe( thumb.to({flip: true}).execSync() )
        .pipe( thumb.to({rotate: 180}).execSync() )
        .pipe( output )
        .on('close', done);

    });

    it('mirror 3, should be done ', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-mirror-3.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({size:'800x600', flip: true, blur: 5, rotate: 180}).execSync() )
        .pipe( output )
        .on('close', done);

    });

  });

  describe('test with same value, inthe same order, Multiple pipe bis', function(){

    it('mirror 1(all in one method), should be done', function(done){
      thumb.to({
        source:'samples/test.jpg',
        destination: 'samples/test-mirror-1-bis.jpg',
        done: done,
        flip: true,
        blur: 5,
        rotate: 180,
        size:'800x600'
      }).execSync();

    });

    it('mirror-2 slower, should be done', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-mirror-2-bis.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({flip: true}).execSync() )
        .pipe( thumb.to({blur: 5}).execSync() )
        .pipe( thumb.to({rotate: 180}).execSync() )
        .pipe( thumb.to({size:'800x600'}).execSync() )
        .pipe( output )
        .on('close', done);

    });

    it('mirror 3, should be done ', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-mirror-3-bis.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({flip: true,blur: 5, rotate: 180, size:'800x600'}).execSync() )
        .pipe( output )
        .on('close', done);

    });

  })


  describe('test with same value(without blur), inthe same order, Multiple pipe ', function(){

    it('mirror 1(all in one method), should be done', function(done){
      thumb.to({
        source:'samples/test.jpg',
        destination: 'samples/test-mirror-1-ter.jpg',
        done: done,
        size:'800x600',
        flip: true,
        rotate: 180
      }).execSync();

    });

    it('mirror-2 slower', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-mirror-2-ter.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({size:'800x600'}).execSync() )
        .pipe( thumb.to({flip: true}).execSync() )
        .pipe( thumb.to({rotate: 180}).execSync() )
        .pipe( output )
        .on('close', done);

    });

    it('mirror 3, should be done ', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-mirror-3-ter.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({size:'800x600', flip: true, rotate: 180}).execSync() )
        .pipe( output )
        .on('close', done);

    });

  });

  describe('test with same value(without blur), inthe same order, Multiple pipe ', function(){

    it('mirror 1(all in one method), should be done', function(done){
      thumb.to({
        source:'samples/test.jpg',
        destination: 'samples/test-mirror-1-4.jpg',
        done: done,
        flip: true,
        rotate: 180,
        size:'800x600'
      }).execSync();

    });

    it('mirror-2 slower, should be done', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-mirror-2-4.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({flip: true}).execSync() )
        .pipe( thumb.to({rotate: 180}).execSync() )
        .pipe( thumb.to({size:'800x600'}).execSync() )
        .pipe( output )
        .on('close', done);

    });

    it('mirror 3, should be done ', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-mirror-3-4.jpg"
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({flip: true, rotate: 180, size:'800x600'}).execSync() )
        .pipe( output )
        .on('close', done);

    });

  })


})
