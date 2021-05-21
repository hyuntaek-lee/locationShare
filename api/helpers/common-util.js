const bcrypt = require('bcrypt');
const saltRounds = 12;

const utils = (() => {
  return {
    /**
     * 암호화
     * @param password
     * @returns {*}
     */
    encrypt : (password) => {
      //암호화
      return bcrypt.hashSync(password, saltRounds);
    },
    /**
     * 암호 체크
     * @param password
     */
    cryptCheck : (password, dbPassword) => {
      return bcrypt.compareSync(password, dbPassword);
    },
    /**
     * @param req
     * @returns {Promise<{sessionInfo, metaInfo: undefined, dataInfo: undefined, precessedDate: Date, commonInfo: (*|string), categoryInfo: (*|string), filterInfo: (*|string)}>}
     */
    data: async (req) => {
      return {
        sessionInfo: req.session,
        dataInfo: undefined
      };
    },
  };
})();

module.exports = {

  friendlyName: '',

  description: '',

  sync: true,

  inputs: {
    req: {
      type: 'ref',
      required: false
    }
  },

  fn: function (inputs) {
    return utils;
  }

};

