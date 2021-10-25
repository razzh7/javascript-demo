let oList = document.getElementsByClassName('list')[0],
    oListItem = document.getElementsByClassName('list-item'),
    startX,
    moveX;
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
        if(startX - moveX >= 50) {
            item.classList.remove('silde-away');
            item.classList.add('animation');
            item.classList.add('silde-out');
        }
        if(moveX - startX >= 50) {
            item.classList.remove('silde-out');
            item.classList.add('silde-away');
        }
    }

    function handleTouchEnd(e) {
        console.log('end')
    }
    
    function handleClick(e) { // 点击之后聊天框归位
        let event = e.target || window.event,
            item = event.closest('.list-item');

        item.classList.remove('silde-out');
        item.classList.add('silde-away');
    }