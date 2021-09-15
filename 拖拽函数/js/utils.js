//查看滚动条距离
// 常规：window.pageXoffset/pageYoffset
// IE9/IE8及以下：
// document.body.scrollLeft/scrollTop
// document.documentElement.scrollLeft/scrollTop
// 不常见: window.scrollX/scrollY
// 找到父元素下的子元素
function ElemChildren(node){
  var temp = {
    length: 0,
    splice: Array.prototype.splice,
    push: Array.prototype.push
  },
  child = node.childNodes;
  for(var i = 0; i < child.length; i++){
    var children = child[i];
    if(children.nodeType === 1){
      temp.push(children);
    }
  }
  return temp;
}
function getScrollOffset(){
  if(window.pageXOffset){
    return {
      left: window.pageXOffset,
      rigth: window.pageYOffset
    }
  }else{
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}
/*
 * 获取浏览器可视区域的尺寸（窗口的宽高）
 * 常规： window.innerWidth/innerHeight (包括x轴的滚动条的y轴长度)
 * IE9/IE8及以下：
 * 标准: document.documentElement.clientWidth/clientHeight (不包括x轴的滚动条的y轴长度)
 * 怪异: document.body.clientWidth/clientHeight (包括x轴的滚动条的y轴长度)
 */
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
//获取元素内容高度（文档高度）
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
//查看计算样式
function getStyles(elem, prop){
  if(window.getComputedStyle){
    if(prop){
      return parseInt(getComputedStyle(elem, null)[prop]);  //如果prop存在返回具体的属性值
    }else{
      return getComputedStyle(elem, null);  //若不存在则返回属性集合
    }
  }else{
    // 兼容IE8及其以下
    if(prop){
      return parseInt(elem.currentStyle[prop]);
    }else{
      return elem.currentStyle;
    }
  }
}
//添加点击事件
function addEvent(el, type, fn){
  if(el.addEventListener){
    // 兼容IE9及以上
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    // 兼容IE8及其以下
    el.attachEvent('on' + type, function(){
      fn.call(el);
    });
  }else{
    //如果都不行，那么就采取原始的点击方法
    el['on' + type] = fn;
  }
}
 //解除点击事件
 function removeEvent(elem, type, fn){
    if(elem.removeEventListener){
      elem.removeEventListener(type, fn, false);
    }else if(elem.attachEvent){
      elem.detachEvent('on' + type, fn);
    }else{
      elem['on' + type] = null;
    }
 }
    //取消冒泡
    function cancelBubble(e){
      // window.event兼容IE8
      var e = e || window.event;
      if(e.stopPropagation){
        e.stopPropagation();
      }else{
        e.cancelBubble = true;
      }
    }
    //阻止浏览器默认动作
    function preventDefaultEvent(e){
      var e = e || window.event;
      if(e.preventDefault){
        //W3C规范，IE9以下不兼容
        e.preventDefault();
      }else{
        //兼容IE9-
        e.returnValue = false;
      }
    }
    //获取鼠标坐标
    function pagePos(e){
      var sLeft = getScrollOffset().left,
          sTop = getScrollOffset().top,
          cLeft = document.documentElement.clientLeft || 0, //body的左边距
          cTop = document.documentElement.clientTop || 0; //body的上边距
      return {
        //e.clientX不包括滚动条的距离，所以要加上sLeft
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
      }    

    }
    //拖拽元素
        function elemDrug(elem){
          addEvent(elem, 'mousedown', function(e){
                  var e = e || window.event,
                      x = pagePos(e).X - getStyles(elem, 'left'),
                      y = pagePos(e).Y - getStyles(elem, 'top'),
                      viewWidth = getViewPortSize().width;
                  addEvent(document, 'mousemove', mouseMove);
                  addEvent(document, 'mouseup', mouseUp);
                  cancelBubble(e);
                  preventDefaultEvent(e);
                  function mouseMove(e){
                    var e = e || window.event;
                        elem.style.left = pagePos(e).X - x + 'px';
                        elem.style.top = pagePos(e).Y - y + 'px'; 

                  }
                  function mouseUp(){
                    removeEvent(document,'mousemove', mouseMove);
                    removeEvent(document, 'mouseup', mouseUp);
                  }
          })
    }
/*
 *  拖拽函数
 *  1.实现基本拖拽 完成
 *  2.在原型上实现 完成
 *  3.点击跳转页面 完成
 *  4.限制元素边界 完成
 *  5.右键弹出菜单 完成
 *  6.限制菜单边界 完成
 *  7.双击事件
 */
Element.prototype.drugAclick = (function(clickFn,menu){
    var elemWidth = getStyles(this, 'width'),  //获取元素宽度
      elemHeight = getStyles(this, 'height'), //获取元素高度
      _self = this;  //_self -> Element
  addEvent(this, 'mousedown', function(e){
    var e = e || window.event,
      x = pagePos(e).X - getStyles(this, 'left'),  //元素的边到元素内鼠标点的距离
      y = pagePos(e).Y - getStyles(this, 'top'),
      BrownX = getViewPortSize().width, //获取可视区域宽度
      BrownY = getViewPortSize().height, //获取可视区域高度
      osTime = new Date().getTime(),  //点击时获取初始时间戳
      oeTime = 0,
      mWidth = getStyles(menu, 'width'),  //获取menu元素的宽度
      mHeight = getStyles(menu, 'height') //获取menu元素的高度
      btnCode = e.button;
      //btnCode === 2 触发鼠标右键
      if(btnCode === 2){
        var mLeft = pagePos(e).X,  //获取鼠标点到浏览器左边框的距离
          mTop = pagePos(e).Y, //获取鼠标点到浏览器顶部边框的距离
          mRight = BrownX - mLeft, // 元素内部靠右边的距离
          mBottom = BrownY - mTop; // 元素内部靠底部的距离
        // if(mLeft > 0)
        if(mLeft >= BrownX - mWidth){
          mLeft = BrownX - mWidth - mRight;
        }else if(mTop >= BrownY - mHeight){
          mTop = BrownY - mHeight - mBottom;
        }
        menu.style.left = mLeft + 'px';
        menu.style.top = mTop + 'px';
        menu.style.display = 'block';
      }
    //禁用右键
    addEvent(document,'contextmenu', function(e){
      var e = e || window.event;
      preventDefaultEvent(e);
    })
    //左键点击menu隐藏
    addEvent(document, 'click', function(e){
      menu.style.display = 'none';  //点击menu会出现冒泡事件
    })
    //取消menu的冒泡事件
    addEvent(menu, 'click', function(e){
      var e = e || window.event;
      cancelBubble(e);
    })      
    addEvent(document, 'mousemove', mouseMove);
    addEvent(document, 'mouseup', mouseUp);
    cancelBubble(e); //清除冒泡
    preventDefaultEvent(e);  //清除浏览器默认事件
    function mouseMove(e){
      var e = e || window.event,
        eLeft = pagePos(e).X - x, //元素边到浏览器左侧的距离
        eTop = pagePos(e).Y - y; //元素边到浏览器顶部的距离
          if(eLeft < 0){
            eLeft = 0;
          }else if(eLeft >= BrownX - elemWidth){
            /*
             * BrownX - elemWidth 指视口宽度减去元素本身宽度
             * eLeft 指元素边到浏览器左侧的距离（固定定位的left）
             */
            eLeft = BrownX - elemWidth - 1;
          }
          if(eTop < 0){
            eTop = 0;
          }else if(eTop >= BrownY - elemHeight){
            eTop = BrownY - elemHeight - 1;
          } 
          _self.style.left = eLeft + 'px';  
          _self.style.top = eTop + 'px';              
        
    }
    function mouseUp(e){
      var e = e || window.event,
        btnCode = e.button;
      oeTime = new Date().getTime();  //鼠标抬起时获取结束时间戳
      if(oeTime - osTime < 100 && btnCode === 0 ){
        clickFn();  // 点击跳转网页
      }             
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);  
    }
  })
});