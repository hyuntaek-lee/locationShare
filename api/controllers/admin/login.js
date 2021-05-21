module.exports = {

  friendlyName: 'login',

  description: 'login.',

  inputs: {
  },

  exits: {

  },

  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    let next = this.next;

    let id = req.body.id;
    let pw = req.body.password;

    if (id === "admin" && pw === "1q2w3e4r!!") {
      req.logIn({
        auth: "A",
        ui_userId: id,
        ui_userNm: id
      }, (err) => {
        if (err) {
          console.log(err.stack);
        }
        console.log('local/callback .......................');
        let refer = req.session.refer;
        delete req.session.refer;
        return exits.success({
          refer: refer || '/admin/userList'
        });
      });
    }
    else {
      return exits.success({
        message: "아이디 또는 비밀번호가 일치하지 않습니다."
      });
    }
  }


};
