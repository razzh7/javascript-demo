var sTopBtn = document.getElementsByTagName('s-top-btn')[];
addEvent(window, 'scroll', function(){
  var scrollTop = getScrollOffset()
  if(scrollTop){
    sTopBtn.style.display = 'block';
  }
})