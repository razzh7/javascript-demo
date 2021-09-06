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
      _self.isBtnShow();
    })
  }
  AutoRead.prototype = {
    setAutoPlay: function(){

    },
    isBtnShow: function(){
      var sTopScroll = getScrollOffset().top;
      // sTopScroll >= 200 ? this.btnTop.style.display = 'none' : this.btnTop.style.display = 'block'
      this.btnTop.style.display = sTopScroll >= 200 ? 'none' : 'block';
    }
  }
  window.AutoRead = AutoRead;
})();