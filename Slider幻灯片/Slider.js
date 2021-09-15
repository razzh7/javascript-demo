;(function(){
  var Slider = function(opt){
    this.sliderItem = document.getElementsByClassName(opt.sliderItem);
    this.thumbItem = document.getElementsByClassName(opt.thumbItem);
    this.bindSlider();
  }
  Slider.prototype.bindSlider = function(){
    var slider = this.sliderItem;
    var thumbs = this.thumbItem;
    for(var i = 0; i < slider.length; i++){
      (function(j){
        thumbs[j].onclick = function(){
          for(var k = 0; k < thumbs.length; k++){
            thumbs[k].className = 'thumbs-item';
            slider[k].className = 'slider-item';
          }
          this.className += ' active';
          slider[j].className += ' current';
        }
      })(i)
    }
  }
  window.Slider = Slider;
})()

