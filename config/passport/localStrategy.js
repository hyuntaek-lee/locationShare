const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField : 'id',
  passwordField : 'password',
  session : true,
  passReqToCallback : false
},
  async (username, password, done) => {
    const utils = sails.helpers.commonUtil();

    let exUser = await UserInfo.findOne({
      where: { ui_userId: username },
    });

    if (exUser && utils.cryptCheck(password, exUser.ui_password)) {
      done(null, exUser);
    } else {
      done(null, false, {message: '아이디 또는 비밀번호가 일치하지 않습니다.'});
    }
  }
));
