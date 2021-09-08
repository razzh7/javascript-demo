var box = document.getElementsByClassName('box'),
    boxes = Array.from(box), //类数组转数组
    id = boxes[0].id;
    history.pushState({ id }, '', '/' + id);  //第一个先加入history.state栈中

    function selection(id) {
      boxes.forEach(elem => {
        //切换active类，满足second parameter Boolean value
        elem.classList.toggle('active',elem.id === id);
      })
    }
    
    boxes.forEach(elem => {
      console.log(elem.id);
      var id = elem.id; //内部屏蔽效应

      elem.addEventListener('click', function() {
        history.pushState({ id },'','/' + id);
        selection(id)
      })
    });
    //监听popstate，浏览器的历史条目变化将会触发这个事件
    window.addEventListener('popstate', function(e) {
      var id = e.state.id;
      selection(id);
    })