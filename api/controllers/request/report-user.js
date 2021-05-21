const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'report user',

  description: 'report user',

  inputs: {
    ru_userIndex: {
      type: 'number',
      required: true,
    },
    ru_requsetUserIndex: {
      type: 'number',
      required: true,
    },
    ru_reason: {
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

      let request = await RequestUser.create(inputs).fetch();

      if (request) {
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
