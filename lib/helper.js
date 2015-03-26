var fs = require('fs')
  , im = require('imagemagick-native');

module.exports.convert = function (inputs) {
  if (inputs.size) {
    var s = inputs.size.split('x');
    inputs.width = s[0];
    inputs.height = s[1];
    delete inputs.size;
  }
  return im.streams.convert(inputs);
}

module.exports.read = function (path) {
  return fs.createReadStream(path);
}

module.exports.write = function (path) {
  return fs.createWriteStream(path);
}

module.exports.fileExist = function(path) {
  return fs.existsSync(path);
}

module.exports.isStream = function(stream) {
  return require('isstream')(stream);
}

module.exports.enqueue = function(stream, inputs, done) {
  if (inputs.length) {
    var item = inputs.shift();
    stream
      .pipe( this.convert(item) )
      .pipe( this.write( this.dest(item.source, item.name) ) );
    this.enqueue(stream, inputs, done);
  } else {
    done()
  }
}

module.exports.dest = function(source, name) {
  var ext = source.slice(-4);
  return source.replace(ext, "-" + name + ext);
}

