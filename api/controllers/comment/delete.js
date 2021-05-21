const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'delete comment',

  description: 'delete comment',

  inputs: {
    c_index: {
      type: 'number',
      required: true,
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

      let comment = await Comment.destroy({
        where: { c_index: inputs.c_index}
      }).fetch();

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
