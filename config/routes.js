/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  'GET /': 'index',
  'POST /login': 'account/login',
  'GET /logout' : function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/');
  },

  /* 회원가입 */
  'GET /register': 'account/register',
  'POST /register': 'account/update',

  'GET /main': 'main',

  /* 장소 */
  'GET /placeList': 'place/list',
  'GET /addPlace': 'place/add',
  'POST /addPlace': 'place/insert',

  /* 댓글 */
  'GET /commentList': 'comment/list',
  'POST /addComment': 'comment/add',
  'POST /deleteComment': 'comment/delete',

  /* 요청 */
  'POST /requestDeletePlace': 'request/delete-place',
  'POST /reportUser': 'request/report-user',


  /* 관리자 */
  'GET /admin': 'admin/main',
  'POST /admin/login': 'admin/login',
  'GET /admin/logout' : function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/admin');
  },

  /* 관리자 회원정보 */
  'GET /admin/userList': 'admin/user/list',

  /* 관리자 장소정보 */
  'GET /admin/placeList': 'admin/place/list',

  /* 404 */
  'GET /404Error': {
    action: 'common/error-page',
    locals: {
      layout: false
    }
  },
};
