const passport = require('passport');

module.exports = {

  friendlyName: 'login',

  description: 'login.',

  inputs: {
  },

  exits: {

  },

  fn: async function (inputs) {
    let req = this.req;
    let res = this.res;
    let next = this.next;

    return new Promise(((resolve, reject) => {
      passport.authenticate('local', (err, user, message) => {
        if (err) {
          console.log(err.stack);
        }
        console.log('passport.authenticate(local)실행');

        if (!user) {
          resolve(message);
        } else {
          req.logIn(user, (err) => {
            if (err) {
              console.log(err.stack);
            }
            console.log('local/callback .......................');
            let refer = req.session.refer;
            delete req.session.refer;
            resolve({refer: refer || '/main'});
          });
        }
      })(req, res, next);
    }));
  }


};
