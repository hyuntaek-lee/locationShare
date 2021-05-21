const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'place list',

  description: 'place list',

  inputs: {
    pi_latitude: {
      type: 'string',
      required: false
    },
    pi_longitude: {
      type: 'string',
      required: false
    },
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

      let query = ` SELECT pi.pi_index, pi.pi_placeNm, pi.pi_latitude, pi.pi_longitude, pi.pi_description, rp.rp_index
                    FROM PlaceInfo pi

                    LEFT OUTER JOIN RequestPlace rp
                    ON pi.pi_index = rp.rp_placeIndex

                    WHERE pi.pi_useYn = $1 `;

      let queryResult = await sails.sendNativeQuery(query, ['Y']);

      data.dataInfo = queryResult.rows;

      return exits.success(data);

    } catch (exception) {
      console.log(exception);
      return exits.serverError();
    }
  }

};
