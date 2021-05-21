const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'place list',

  description: 'place list',

  inputs: {
  },

  exits: {
    success: {
      statusCode: 200,
      viewTemplatePath: 'pages/admin/place/list'
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

      let placeList = await PlaceInfo.find();

      data.dataInfo = placeList;

      return exits.success(data);

    } catch (exception) {
      console.log(exception);
      return exits.serverError();
    }
  }

};
