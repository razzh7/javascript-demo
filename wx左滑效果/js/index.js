let oList = document.getElementsByClassName('list')[0],
    oListItem = document.getElementsByClassName('list-item'),
    startX,
    moveX;

    oList.addEventListener('touchstart', handleTouchStart)
    oList.addEventListener('touchmove', handleTouchMove)
    oList.addEventListener('touchend', handleTouchEnd)

    function handleTouchStart(e) {
        startX = e.touches[0].pageX; // 记录开始的X坐标
        console.log('start',startX);
    }

    function handleTouchMove(e) {
        moveX = e.touches[0].pageX; // 记录移动时候的X坐标
        let event = e.target || window.event;
        let oDel = event.getElementsByClassName('del')[0];
        if(startX - moveX > 50) {
            oDel.classList.add('active');
        }
    }

    function handleTouchEnd(e) {
        console.log('end')
    }