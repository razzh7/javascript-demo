let oList = document.getElementsByClassName('list')[0],
    oListItem = document.getElementsByClassName('list-item'),
    startX,
    moveX,
    oDel, // 删除按钮
    index;
    oList.addEventListener('touchstart', handleTouchStart)
    oList.addEventListener('touchmove', handleTouchMove)
    oList.addEventListener('touchend', handleTouchEnd)
    oList.addEventListener('click', handleClick)
    function handleTouchStart(e) {
        startX = e.touches[0].pageX; // 记录开始的X坐标
    }

    function handleTouchMove(e) {
        moveX = e.touches[0].pageX; // 记录移动时候的X坐标
        let event = e.target || window.event;
        let item = event.closest('.list-item');
        oDel = event.closest('.cheat').getElementsByClassName('del')[0];
        index = item.getAttribute('data-index');
        if(startX - moveX >= 50) { // 左滑动距离大于删除模块的宽度时
            item.classList.remove('silde-away'); // 第一次滑块后，第二次使用时清除样式
            item.classList.add('animation'); // 向list-item添加过渡效果
            item.classList.add('silde-out'); // 将list-item的transfrom:translate 0 -> -50px
        }
        if(moveX - startX >= 50) { // 右滑动触发
            item.classList.remove('silde-out'); // 清除左滑时候的样式
            item.classList.add('silde-away'); // 添加复位样式:list-item的transfrom:translate -50 -> 0px
        }
    }

    function handleTouchEnd() {
        oDel.addEventListener('click', handleDel) // 删除操作
    }
    
    function handleClick(e) { // 点击之后聊天框归位
        let event = e.target || window.event,
            item = event.closest('.list-item');
        if(item) { // 点击到list-item才能复位
            item.classList.remove('silde-out');
            item.classList.add('silde-away');
        }
    }
    function handleDel(e) {
        console.log(e.target)
        let event = e.target || window.event,
            item = event.closest('.cheat');
        item.remove();
    }
    