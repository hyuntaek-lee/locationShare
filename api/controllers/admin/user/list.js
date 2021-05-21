const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'user list',

  description: 'user list',

  inputs: {
  },

  exits: {
    success: {
      statusCode: 200,
      viewTemplatePath: 'pages/admin/user/list'
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

      let userList = await UserInfo.find({
        // where: {
        //   ui_index: inputs.ui_index
        // }
      });

      data.dataInfo = userList;

      return exits.success(data);

    } catch (exception) {
      console.log(exception);
      return exits.serverError();
    }
  }

};
