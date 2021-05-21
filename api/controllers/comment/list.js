const utils = sails.helpers.commonUtil();

module.exports = {

  friendlyName: 'comment list',

  description: 'comment list',

  inputs: {
    c_placeIndex: {
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

      let query = ` SELECT c.c_index, c.c_userIndex, u.ui_userNm, c.c_comment, c.c_grade
                    FROM Comment c

                    INNER JOIN UserInfo u
                    ON c.c_userIndex = u.ui_index

                    WHERE c.c_placeIndex = $1 `;

      let queryResult = await sails.sendNativeQuery(query, [inputs.c_placeIndex]);

      // let commentList = await Comment.find({
      //   where: {
      //     c_placeIndex: inputs.c_placeIndex
      //   },
      //   select: ['c_index', 'c_userIndex', 'c_placeIndex', 'c_comment']
      // });

      let commentList = queryResult.rows;
      let totalGrade = 0;
      commentList.forEach(x => totalGrade += x.c_grade);
      let avgGrade = totalGrade > 0 ? (totalGrade / commentList.length).toFixed(2) : 0;

      data.dataInfo = {
        commentList: commentList,
        avgGrade: avgGrade
      };

      return exits.success(data);

    } catch (exception) {
      console.log(exception);
      return exits.serverError();
    }
  }

};
