var sTopBtn = document.getElementsByClassName('s-top-btn')[0];
addEvent(window, 'scroll', function(){
  var scrollTop = getScrollOffset().top;
  // if(scrollTop >= 200){
  //   // console.log(scrollTop);
  //   sTopBtn.style.display = 'block';
  // }else{
  //   sTopBtn.style.display = 'none';
  // }
  scrollTop >= 200 ? sTopBtn.style.display = 'block' : sTopBtn.style.display = 'none';
})
addEvent(sTopBtn, 'click', function() {
  window.scroll(0,0);
})