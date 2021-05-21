const commonUtil = (function(server){
  return {
    passwordChk: function (pw) {
      try {
        if (!/^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,16}$/.test(pw)) {
          return true;
        }
        var chkNum = pw.search(/[0-9]/g);
        var chkEng = pw.search(/[a-z]/ig);
        var chkSpecial = pw.search(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
        // console.log('chkNum : ', chkNum);
        // console.log('chkEng : ', chkEng);
        // console.log('chkSpecial : ', chkSpecial);
        if ((chkNum >= 0 && chkEng >= 0)
          || (chkNum >= 0 && chkSpecial >= 0)
          || (chkEng >= 0 && chkSpecial >= 0)) {
          return false;
        }
      } catch (err) {
        console.error(err);
      }
      return true;
    },
  };
})(window.SAILS_LOCALS);
