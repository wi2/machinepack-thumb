var fs = require('fs')
	, im = require('imagemagick-native');

module.exports.convert = function (inputs) {
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
