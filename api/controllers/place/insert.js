const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'place insert',

  description: '',

  inputs: {
    pi_placeNm: {
      type: 'string',
      required: true,
    },
    pi_latitude: {
      type: 'string',
      required: true
    },
    pi_longitude: {
      type: 'string',
      required: true
    },
    pi_description: {
      type: 'string',
      required: true
    },
    pi_useYn: {
      type: 'string'
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

      inputs.pi_useYn = "Y";

      let insertPlace = await PlaceInfo.create(inputs).fetch();

      if (insertPlace) {
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
