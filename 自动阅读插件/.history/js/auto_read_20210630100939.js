;(function(){
  var timer = null,
      playing = true,
      htmlHeight = getScrollSize(),  //获取整个文档的高度
      nowView = getViewPortSize();  //获取视口高度
      // sTopScroll = getScrollOffset().top; //获取滚动条滚动距离
  var AutoRead = function(opt){
    this.btnTop = opt.btnTop;
    this.btnplay = opt.btnplay;
    this.sTopScroll = getScrollOffset().top;
    var _self = this;
    addEvent(this.btnTop, 'click', function(){
      //点击小火箭返回顶部
      window.scrollTo(0, 0);
    })
    addEvent(this.btnplay, 'click', function(){
      _self.setAutoPlay();
    })
    //滚动条距离大于200不显示小火箭
    addEvent(window, 'scroll', function(){
      _self.isBtnShow();
    })
  }
  AutoRead.prototype = {
    setAutoPlay: function(){
      if(!playing){
        // this.btnplay.style.background = 'url(./img/pause.png) no-repeat 0 0/100% 100%';
        // timer拿不到
        var _self = this;
        timer = setInterval(function(){  
          var sTopScroll = getScrollOffset().top;
          console.log(sTopScroll);
          if(htmlHeight <= nowView + sTopScroll){
            clearInterval(timer);
            _self.btnplay.style.background = 'url(./img/playing.png) no-repeat 0 0/100% 100%';
            playing = false;
          }else{
            window.scrollBy(0,1);
            _self.btnplay.style.background = 'url(./img/pause.png) no-repeat 0 0/100% 100%';
          }
        }, 1);
      }
      // console.log(htmlHeight, nowView, sTopScroll);

      
    },
    isBtnShow: function(){
      var sTopScroll = getScrollOffset().top;
      this.btnTop.style.display = sTopScroll >= 200 ? 'block' : 'none';
    }
  }
  window.AutoRead = AutoRead;
})();