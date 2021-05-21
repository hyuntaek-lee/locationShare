const utils = sails.helpers.commonUtil();
module.exports = {


  friendlyName: 'View 404',


  description: 'Display "404" page.',

  inputs: {
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: '404'
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
    try{
      return exits.success();
    }catch(e){
      console.log(e);
      return exits.success(false);
    }
  }
};
