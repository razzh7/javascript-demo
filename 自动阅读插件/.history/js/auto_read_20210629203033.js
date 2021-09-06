;(function(){
  var timer = null,
      playing = true
  var AutoRead = function(opt){
    this.btnTop = opt.btnTop;
    this.btnplay = opt.btnplay;
    var _self = this;
    addEvent(this.btnTop, 'click', function(){
      //点击小火箭返回顶部
      window.scrollTo(0, 0);
    })
    addEvent(this.btnplay, 'click', function(){

    })
    addEvent(window, 'scroll', function(){
      this.isBtnShow();
    })
  }
  AutoRead.prototype = {
    setAutoPlay: function(){

    },
    isBtnShow: function(){
      var sTopScroll = getScrollOffset().top;
      console.log(sTopScroll);
    }
  }
  window.AutoRead = AutoRead;
})();