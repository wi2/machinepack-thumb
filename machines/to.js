module.exports = {


  friendlyName: 'To',
  description: 'Transform an convert image (PNG, JPG) with crop, resize, blur, rotate, flip, ...',
  extendedDescription: 'Base on : https://github.com/mash/node-imagemagick-native',

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
      description: "a callback after writing, obligatory if destination's input",
      required: false
    },
    quality: {
      example: 2,
      description: 'a number (1-100)',
      required: false
    },
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    warningTodo: {
      description: "TODO, help is welcome. Actually you need the source and the destination, not just source or just destination"
    },
    success: {
      description: 'Done.',
    },
  },

  fn: function (inputs,exits) {
    var helper = require("../lib/helper.js")
      , stream;

    if (inputs.size) {
      var s = inputs.size.split('x');
      inputs.width = s[0];
      inputs.height = s[1];
    }

    if (inputs.source || inputs.destination) {
      if (inputs.source && inputs.destination) {
        var streamDest = helper.write(inputs.destination);
        streamDest.on('close',inputs.done);
        stream = helper.read(inputs.source)
          .pipe( helper.convert(inputs) )
          .pipe( streamDest );

      } else {
        //todo
        return exits.warningTodo();
      }
    }

    // return exits.success();
    return exits.success( stream||helper.convert(inputs) );
  },

};
