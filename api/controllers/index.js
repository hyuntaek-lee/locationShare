const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'homepage',

  description: 'main page',

  inputs: {
  },

  exits: {
    success: {
      statusCode: 200,
      viewTemplatePath: 'index'
    },
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
      return exits.success(data);
    } catch (exception) {
      console.log(exception);
      return exits.serverError();
    }
  }

};
