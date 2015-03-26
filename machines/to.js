module.exports = {


  friendlyName: 'To',
  description: 'Transform an convert image (PNG, JPG) with crop, resize, blur, rotate, flip, ...',
  extendedDescription: 'Base on : https://github.com/mash/node-imagemagick-native. See Test file example (npm test)',

  sync: true,

  inputs: {
    blur: {
      example: 2,
      description: 'a number',
      required: false
    },
    width: {
      example: 120,
      description: 'a with of thumb',
      required: false
    },
    height: {
      example: 120,
      description: 'a height of thumb',
      required: false
    },
    size: {
      example: '120x250',
      description: 'a string  [width]x[height]',
      required: false
    },
    source: {
      example: 'samples/test.png',
      description: 'a source path',
      required: false
    },
    destination: {
      example: 'samples/test-blur.png',
      description: 'a destination path',
      required: false
    },
    done: {
      typeclass: "*",
      description: "a callback after writing",
      required: false
    },
    quality: {
      example: 2,
      description: 'a number (1-100)',
      required: false
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    success: {
      description: 'Done.',
    },
  },

  fn: function (inputs,exits) {
    var helper = require("../lib/helper.js")
      , stream;

    if (inputs.source && inputs.destination) {
      stream = helper.read(inputs.source)
        .pipe( helper.convert(inputs) )
        .pipe( helper.write(inputs.destination) )
        .on('close', inputs.done);

    } else if (inputs.source) {
      stream = helper.read(inputs.source)
        .pipe( helper.convert(inputs) )

    } else if (inputs.destination) {
      stream = process.stdin
        .pipe( helper.convert(inputs) );
      //need to separate this pipe for working.
      stream
        .pipe( helper.write(inputs.destination) )
        .on('close', inputs.done);

    }

    return exits.success( stream||helper.convert(inputs) );
  },

};
