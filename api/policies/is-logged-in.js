/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/\concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
  let throwURl = ['/', '/login', '/register', '/admin', '/admin/login'];

  if(req.session.passport && _.includes(throwURl, req._parsedUrl.pathname)) {
    if(req.session.passport.user.auth === "A")
      return res.redirect('/admin/userList');
    else
      return res.redirect('/main');
  }
  else if(req.session.passport || _.includes(throwURl, req._parsedUrl.pathname)) {
    if(req.session.passport && req.session.passport.user.auth !== "A" && req._parsedUrl.pathname.startsWith("/admin"))
      return res.redirect('/main');
    else
      return proceed();
  }
  else {
    return res.redirect('/');
  }
};
