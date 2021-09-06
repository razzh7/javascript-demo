var sTopBtn = document.getElementsByTagName('s-top-btn');
addEvent(sTopBtn, 'scroll',function(){
  var scrollTop = getScrollOffset()
  // if(scrollTop){
  //   console.log(1);
  // }
  console.log(scrollTop);
})