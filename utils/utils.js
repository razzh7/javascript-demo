var utils = {
  //类数组转数组
  ConvertToArray: function(nodes) {
    var array = [];
    try {
      array = Array.prototype.slice.call(nodes, 0); //针对IE浏览器
    }catch {
      for(var i = 0; i < nodes.length; i++) {
        array.push(nodes[i]);
      }
    }
    return array;
},
  // 找到父元素下的子元素 
  ElemChildren: function(node) {
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
  },
  /*
   * 查看滚动条距离顶部距离
   * 常规：window.pageXOffset/pageYOffset
   * IE9/IE8及以下：
   * document.body.scrollLeft/scrollTop
   * 不常见: window.scrollX/scrollY
   */
  getScrollOffset: function(){
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
  },
  /*
   * 获取浏览器可视区域的尺寸（窗口的宽高）
   * 常规： window.innerWidth/innerHeight (包括x轴的滚动条的y轴长度)
   * IE9/IE8及以下：
   * 标准: document.documentElement.clientWidth/clientHeight (不包括x轴的滚动条的y轴长度)
   * 怪异: document.body.clientWidth/clientHeight (包括x轴的滚动条的y轴长度)
   */
   getViewPortSize: function(){
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
  },
  //获取元素内容高度（文档高度）
  getScrollSize: function(){
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
  },

  //查看计算样式
  getStyles: function(elem, prop){
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
  },

  //添加点击事件
  addEvent: function(el, type, fn){
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
  },

  //解除点击事件
  removeEvent: function(elem, type, fn){
    if(elem.removeEventListener){
      elem.removeEventListener(type, fn, false);
    }else if(elem.attachEvent){
      elem.detachEvent('on' + type, fn);
    }else{
      elem['on' + type] = null;
    }    
  },

  //取消冒泡
  cancelBubble: function(e){
    // window.event兼容IE8
    var e = e || window.event;
    if(e.stopPropagation){
      e.stopPropagation();
    }else{
      e.cancelBubble = true;
    }
  },

  //阻止浏览器默认动作
  preventDefaultEvent: function(e){
    var e = e || window.event;
    if(e.preventDefault){
      //W3C规范，IE9以下不兼容
      e.preventDefault();
    }else{
      //兼容IE9-
      e.returnValue = false;
    }
  },
  //获取鼠标坐标
  pagePos: function(e){
    var sLeft = getScrollOffset().left,
        sTop = getScrollOffset().top,
        cLeft = document.documentElement.clientLeft || 0, //body的左边距
        cTop = document.documentElement.clientTop || 0; //body的上边距
    return {
      //e.clientX不包括滚动条的距离，所以要加上sLeft
      X: e.clientX + sLeft - cLeft,
      Y: e.clientY + sTop - cTop
    }
  },
    /*
     * 模板渲染函数
     * @param tpl ->模板字符串
     * @param regExp -> 正则规则函数
     * @param opt -> JSON数据   
     */
  setTplToHTML: function(tpl, regExp, opt){
    return tpl.replace(regExp(), function(node, key){
      return opt[key];
    })
  },
    /*
     * 正则替换模板规则
     * g -> 全文匹配
     * i -> 开启大小写敏感
     * m -> 开启多行匹配
     */
  regTpl: function(){
    return new RegExp(/{{(.*?)}}/, 'gim');
    }
}

/************************************网络请求部分****************************/
var $ = (function(){
    function doAjax(opt){
        var url = opt.url,
            type = opt.type,
            dataType = opt.dataType || 'JSON'
            data = opt.data,
            async = '' + opt.async === 'false' ? false : true,  //异步模式默认开启
            success = opt.success,
            timeout = opt.timeout || 30000,
            complete = opt.complete || function(){}, //无论请求成功或失败都执行complete回调函数
            error = function(){
                throw new Error('HTTP请求失败');
            },
            xhr = window.XMLHttpRequest ? new XMLHttpRequest()
                                        : new ActiveXObject('Mirosoft.XMLHTTP')
            if(!xhr){
                console.log('XMLHttpRequest对象不存在');
            }
        var t = null;

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                if(typeof success === 'function'){
                    // 返回三种数据类型：JSON、TEXT、XML
                    switch(dataType.toUpperCase()){
                        case 'JSON':
                        success(JSON.parse(xhr.responseText));
                        break;
                        case 'TEXT':
                        success(xhr.responseText);
                        break;
                        case 'XML':
                        success(xhr.responseXML);
                        break;
                    }
                }
                complete();
                clearTimeout(t); //请求成功清除超时定时器
                t = null; //初始化定时器
                xhr = null; //初始化xhr对象 
            }
        }

        xhr.open(type,url,async); //发送HTTP请求
        type === 'POST' && xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded'); //POST请求必须设置请求头
        xhr.send(type === 'GET' ? null : formatData(data));
        //请求超时定时器
        t = setTimeout(function(){
            complete();
            xhr.abort();
            error(); //弹出错误
            clearTimeout(t);
            t = null;
            xhr = null;
            throw new ('本次请求已超时，API地址' + url);
        },timeout)

    }

    function formatData(data){
        var list = '';
        for(var name in data){
            list += name + '=' + data[name] + '&';
        }
        list.replace(/&$/, '');  //去除字符串最后的一位&
        return list;
    }
    return {
        ajax: function(opt){
            doAjax(opt);
        },
        get: function(url,callback){
            doAjax({
                url: url,
                type: 'GET',
                success: callback
            });
        },
        post: function(url,data,callback){
            doAjax({
                url: url,
                type: 'POST',
                data: data,
                success: callback
            });
        }
    }
})();


var ajaxDomain = (function(){
    function createIfram(framUrl,framId){
        var ifram = document.createElement('ifram');
        ifram.src = opt.framUrl;
        ifram.id = opt.framId;
        ifram.style = 'none';

        return ifram;
    }

    return function(opt){
            document.domain = opt.baseDomain; //修改域名，使其与请求页面的域名相同
            var ifram = createIfram(opt.url,opt.framId); 
            // 等ifram放入html后触发
            ifram.onload = function(){
                //利用子页面向另外一个资源发起请求
                var $$ = document.getElementById(opt.framId).contentWindow.$;
                $$.ajax({
                    url: opt.url,
                    type: opt.type,
                    dataType: opt.dataType,
                    success: opt.success,
                    error: opt.error
                })
            }
            
            document.body.appendChild(ifram);            
    }
})();