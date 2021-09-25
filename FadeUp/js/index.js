  // 原理：滚动条向上滚动的距离和元素距离顶部距离的对比
  // 由于元素距离顶部远大于滚动条向上滚动的距离，所以要减去视口高度
  var child = document.getElementsByClassName('child');
  fadeInUp(child)
  function fadeInUp(child) {
  var len = child.length,
      i = 0, //元素计时器
      isFirst = true, //第一个元素动画延迟0.1s
      delay = 0.1,
      arr = [],
      item;
    // 处理传进来的数组，数组的长度的每一项作为arr的数组项，为fadeInUp提供元素距离顶部高度值
    function isNum() {
      for (var j = 0; j < len; j++) {
        item = child[j].getBoundingClientRect().top; //获取每一项数组离顶部的值
        arr.push(item);
      }
    }
    isNum();
    window.addEventListener('scroll', function () {
      addAnimation();
    })
    function addAnimation() {
      if (i >= len) {
        return;
      }
      var scroll = document.documentElement.scrollTop;  //滚动条
      var elemTop = arr[i];
      var innerHeight = window.innerHeight; //当前页面可用高度
      elemTopSub = elemTop - innerHeight;  //滚动条滚动距离
      // scroll > elemTopSub 元素顶部零界点，大于它就会触发动画效果
      if (isFirst && scroll > elemTopSub) {
        child[i].style['animation-name'] = 'fadeInUp';
        child[i].style['animation-duration'] = 1.5 + 's';
        child[i].style['animation-delay'] = delay + 's'
        child[i].style['animation-fill-mode'] = 'forwards';
        isFirst = false;
        i++;
        return;
      }
      if (scroll > elemTopSub && len > i) {
        delay += 0.1;
        child[i].style['animation-name'] = 'fadeInUp';
        child[i].style['animation-duration'] = 1.5 + 's';
        child[i].style['animation-delay'] = delay + 's'
        child[i].style['animation-fill-mode'] = 'forwards';
        i++;
      }
    }
  }