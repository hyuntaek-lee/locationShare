const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'user update',

  description: '',

  inputs: {
    ui_userId: {
      type: 'string',
      required: true,
    },
    ui_password: {
      type: 'string',
      required: false
    },
    ui_userNm: {
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

      let updateData = {
        ui_userId: inputs.ui_userId,
        ui_password: utils.encrypt(inputs.ui_password),
        ui_userNm: inputs.ui_userNm
      };

      let updateUser = await UserInfo.create(updateData).fetch();

      if (updateUser) {
        data.dataInfo = {
          result: 'success',
          ui_userId: inputs.ui_userId
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
