const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'add comment',

  description: 'add comment',

  inputs: {
    c_userIndex: {
      type: 'number',
      required: true,
    },
    c_placeIndex: {
      type: 'number',
      required: true
    },
    c_comment: {
      type: 'string',
      required: true
    },
    c_grade: {
      type: 'number',
      required: true
    }
  },

  exits: {
    unAuthorized: {
      statusCode: 403
    },
    notFound: {
      statusCode: 404
    },
    serverError: {
      statusCode: 500
    }
  },

  fn: async function (inputs, exits) {
    try {
      let data = await utils.data(this.req);

      let comment = await Comment.create(inputs).fetch();

      if (comment) {
        data.dataInfo = {
          result: 'success'
        };
      } else {
        data.dataInfo = {
          result: 'fail'
        };
      }

      return exits.success(data);

    } catch (exception) {
      console.log(exception);
      return exits.serverError();
    }
  }

};
