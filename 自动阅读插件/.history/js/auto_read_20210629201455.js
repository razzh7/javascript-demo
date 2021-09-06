;(function(){
  var AutoRead = function(opt){
    this.btnTop = opt.btnTop;
    this.btnplay = opt.btnplay;
    addEvent(this.btnTop, 'click', function(){
      window.scrollTo(0, 0);
    })
  }
  AutoRead.prototype = {
  }
  window.AutoRead = AutoRead;
})();