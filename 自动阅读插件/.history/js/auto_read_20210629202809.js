;(function(){
  var timer = null,
      playing = true
  var AutoRead = function(opt){
    this.btnTop = opt.btnTop;
    this.btnplay = opt.btnplay;
    addEvent(this.btnTop, 'click', function(){
      //点击小火箭返回顶部
      window.scrollTo(0, 0);
    })
    addEvent(this.btnplay, 'click', function(){

    })
    addEvent(this.btnplay, 'scroll', function(){

    })
  }
  AutoRead.prototype = {
    setAutoPlay: function(){

    },
    isBtnShow: function(){
      var sTopScroll = getScrolloffset().top;
      console.log(sTopScroll);
    }
  }
  window.AutoRead = AutoRead;
})();