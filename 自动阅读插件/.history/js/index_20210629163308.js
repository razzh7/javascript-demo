var sTopBtn = document.getElementsByClassName('s-top-btn')[0],  //获取置顶按钮
    Header = document.getElementsByClassName('list-hd')[0];  
addEvent(window, 'scroll', function(){
  var scrollTop = getScrollOffset().top;
  //滚动条距离大于200时显示小火箭，反之不显示
  scrollTop >= 200 ? sTopBtn.style.display = 'block' 
                   : sTopBtn.style.display = 'none';
  sTopBtn.style.display = scrollTop >= 200 ? 'block' : 'none'
})
// 点击小火箭返回顶部
addEvent(sTopBtn, 'click', function() {
  window.scroll(0, 0);
})
//点击header头部返回顶部
addEvent(Header, 'click', function() {
  window.scrollTo(0, 0);
})