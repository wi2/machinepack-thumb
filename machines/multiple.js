module.exports = {

  friendlyName: 'Multiple',
  description: 'generate multiple thumbs for an image',
  extendedDescription: 'look tests/test.js for example',

  sync: true,

  inputs: {
    source: {
      example: 'samples/test.png',
      description: 'a source path',
      required: false
    },
    schema: {
      typeclass: "array",
      description: 'a schema of thumb source',
      required: true
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
    var _ = require("lodash")
      , helper = require("../lib/helper.js")
      , stream
      , first;

    //we store a first stream
    first = inputs.schema.shift();
    stream = helper.read(inputs.source)
      .pipe( helper.convert(first) );

    //simply enqueue other schema
    for(var i=0, len=inputs.schema.length; i<len; i++) {
      _.assign(inputs.schema[i], {source: inputs.source});
    }
    helper.enqueue(stream, inputs.schema, inputs.done);

    //end with the first stream
    stream
      .pipe( helper.write( helper.dest(inputs.source, first.name)) );

    return exits.success(stream);
  },

};
