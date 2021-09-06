var sTopBtn = document.getElementsByClassName('s-top-btn')[0];
addEvent(window, 'scroll', function(){
  var scrollTop = getScrollOffset().top;
  if(scrollTop >= 200){
    console.log(scrollTop);
    // sTopBtn.style.display = 'block';
  }
})