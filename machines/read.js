module.exports = {

  friendlyName: 'Read',
  description: 'Create a read stream with a source path',
  extendedDescription: '',

  sync: true,

  inputs: {
    source: {
      example: 'samples/test.png',
      description: 'a source path',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    errorFileNotFind: {
      description: 'File Not Find'
    },
    success: {
      description: 'Done.',
    },
  },

  fn: function (inputs,exits) {
    var helper = require("../lib/helper.js");
    if (helper.fileExist(inputs.source)) {
      return exits.success( helper.read(inputs.source));

    } else {
      return exits.errorFileNotFind();

    }

  },
};
