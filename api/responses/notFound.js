module.exports = function notFound() {
  let res = this.res;
  return res.redirect('/404Error');
};
