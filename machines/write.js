module.exports = {

  friendlyName: 'Write',
  description: 'Write your file in destination path',
  extendedDescription: '',

  sync: true,

  inputs: {
    destination: {
      example: 'samples/test-blur.png',
      description: 'a destination path',
      required: true
    },
    done: {
      typeclass: "*",
      description: "a callback after writing",
      required: false
    },
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
    var helper = require('../lib/helper.js');

    var streamDest = helper.write(inputs.destination);
    streamDest.on('close',inputs.done);

    return exits.success( streamDest );
  },



};
