const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'delete comment',

  description: 'delete comment',

  inputs: {
    rp_placeIndex: {
      type: 'number',
      required: true,
    },
    rp_requsetUserIndex: {
      type: 'number',
      required: true,
    },
    rp_reason: {
      type: 'string',
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

      let request = await RequestPlace.create(inputs).fetch();

      if (request) {
        data.dataInfo = {
          result: 'success',
          rp_index: request.rp_index
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
