const passport = require('passport');

passport.serializeUser((user, done) => {
  console.log('serializeUser.........................');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserializeUser.........................');
  done(null, user);
});


