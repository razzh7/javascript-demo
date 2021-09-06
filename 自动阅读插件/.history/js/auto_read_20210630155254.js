;(function(){
  var timer = null,
      playing = false,
      htmlHeight = getScrollSize().height,  //获取整个文档的高度
      nowView = getViewPortSize().height;  //获取视口高度
  var AutoRead = function(opt){
    this.btnTop = opt.btnTop;
    this.btnplay = opt.btnplay;
    this.autoSpeed = opt.autoSpeed;
    this.playUrl = opt.playUrl;
    this.pauseUrl = opt.pauseUrl;
    var _self = this;
    if(!this.btnTop){
      console.log('btnTop选项必须要有参数');
      return;
    }else if(!this.btnplay){
      console.log('btnplay选项必须要有参数');
      return;
    }else if(!this.autoSpeed){
      console.log('autoSpeed选项必须要有参数');
      return;
    }else if(!this.playUrl){
      console.log('playUrl选项必须要有参数');
      return;
    }
    addEvent(this.btnTop, 'click', function(){
      //点击小火箭返回顶部
      window.scrollTo(0, 0);
    })
    addEvent(this.btnplay, 'click', function(){
      _self.setAutoPlay();  //自动播放
    })
    //滚动条距离大于200不显示小火箭
    addEvent(window, 'scroll', function(){
      _self.isBtnShow();
    })
  }
  AutoRead.prototype = {
    setAutoPlay: function(){
      var _self = this;
      if(!playing){
        //点击播放按钮启动计时器 
        timer = setInterval(function(){  
          var sTopScroll = getScrollOffset().top; //实时获取滚动条距离
          /**
           * 整个文档的高度 <= 视口宽度 + 滚动条的滚动距离
           * htmlHeight文档高度 和 nowView视口宽度都是保持不变的所以在IIFE作用域声明就可以
           * */ 
          if(htmlHeight <= nowView + sTopScroll){
            clearInterval(timer);  
            _self.btnplay.style.background = 'url('+ _self.playUrl +') no-repeat 0 0/100% 100%';
          }else{
            window.scrollBy(0,1);  //持续累加滚动条
            _self.btnplay.style.background = 'url('+ _self.pauseUrl +') no-repeat 0 0/100% 100%';
          }
        }, _self.autoSpeed);
        playing = true;  //!playing = true -> !true = false进入不了if跳转到else
      }else{
        //点击暂停按钮
        clearInterval(timer);  //暂停播放
        _self.btnplay.style.background = 'url('+ _self.playUrl +') no-repeat 0 0/100% 100%';  //点击按钮 播放按钮 -> 暂停按钮
        playing = false;
      }   
    },
    isBtnShow: function(){
      var sTopScroll = getScrollOffset().top;
      this.btnTop.style.display = sTopScroll >= 200 ? 'block' : 'none';  //滚动条距离超过两百显示反之不显示
    }
  }
  window.AutoRead = AutoRead;
})();