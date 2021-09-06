var sTopBtn = document.getElementsByTagName('s-top-btn')[0];
addEvent(window, 'scroll', function(){
  var scrollTop = getScrollOffset()
  if(scrollTop){
    // sTopBtn.style.display = 'block';
    console.log(sTopBtn);
  }
})