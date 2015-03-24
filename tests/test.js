var should = require('should');
// var helper = require("../lib/helper.js");
var thumb = require("../index.js");
var fs = require("fs")
	, im = require('imagemagick-native');

describe('Array', function(){
  describe('fast method, (autopipe source until destination)', function(){

    it('blur and resize, should be done', function(done){
      thumb.to({
        source:'samples/test.jpg',
        destination: 'samples/test-blur-resize.jpg',
        done: done,
        blur: 3,
        width: 120,
        height: 120
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

  });

  describe('Method with pipe', function(){
    it('blur, should be done', function(done){
      var params = {
        source: "samples/test.jpg",
        destination: "samples/test-blur.jpg",
        done: done
      };
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      input
        .pipe( thumb.to({blur: 3}).execSync() )
        .pipe( output );

    });

    it('crop an resize, should be done', function(done){
      var params = {
    		source: "samples/test.jpg",
    		destination: "samples/test-resize.jpg",
    		done: done
    	};
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      var test = thumb.to({
      	width: 100,
      	height: 80,
      	quality: 80
      }).execSync();

      input.pipe(test).pipe(output);

    });

    it('flip, should be done', function(done){
     	var params = {
    		source: "samples/test.jpg",
    		destination: "samples/test-flip.jpg",
    		done: done
    	};
      var input = thumb.read(params).execSync();
      var output = thumb.write(params).execSync();

      var test = thumb.to({
      	flip: true,
        quality: 25
      }).execSync();

      input.pipe(test).pipe(output);

    });

  })
})
