//cookie encapsulation


var manageCookies = {
  set: function(key, value, expTime) {
    document.cookie = key + '=' + value + ';' + 'max-age=' + expTime;
    return this;
  },
  delete: function(key) {
    return this.set(key, '', -1);  //max-age设置负值说明cookie将被删除
  },
  get: function(key, cb) {
    var cookiesArr = document.cookie.split('; '),
        len = cookiesArr.length;
    for(var i = 0; i < len; i++) {
      var cookieItem = cookiesArr[i].split('=');
      if(cookieItem[0] === key) {
        cb(cookieItem[1]);  //若找到，调用回调函数传入数组第一项
        return this; //结束函数返回this
      }
    }
    cb(undefined);  //否则提示undefined
  }
}

manageCookies.set('name','razzh',1000)
             .set('age',18,1000)
             .set('sex','man',1000)
             .delete('age')
             .get('sex', function(data) {
               console.log(data);
             })