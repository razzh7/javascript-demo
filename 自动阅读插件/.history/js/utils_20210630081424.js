//获取滚动条滚动距离
function getScrollOffset(){
  if(window.pageXOffset){
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  }else{
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}
//获取元素内容高度（文档内容高度）
function getScrollSize(){
  if(document.body.scrollHeight){
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }else{
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}
//获取浏览器可视区域的尺寸
function getViewPortSize(){
  if(window.innerWidth){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else{
    if(document.compatMode === 'BackCompat'){
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    }else{
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}
//添加点击事件
function addEvent(elem, type, fn){
  if(elem.addEventListener){
    elem.addEventListener(type, fn, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + type, function(){
      fn.call(elem);
    })
  }else{
    elem['on' + type] = fn;
  }
}