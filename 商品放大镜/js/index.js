window.onload = function(){
	init();
}

function init(){
	ksImgzoom();
}

var ksImgzoom = (function(){
	var magWrap = document.getElementsByClassName('mag-wrap')[0], //最外层盒子
		imgzoomWrap = magWrap.getElementsByClassName('imgzoom-wrap')[0],//动态盒子
		zoomPlus = magWrap.getElementsByClassName('zoom-plus')[0],//动态盒子内图片
		imgWrapX = getStyles(imgzoomWrap, 'width'),  //zoom图片宽度
		imgWrapY = getStyles(imgzoomWrap, 'height'),  //zoom图片高度
		imgHalfX = imgWrapX / 2,
		imgHalfY = imgWrapY / 2,
		magWidth = getStyles(magWrap, 'width'), //最外层盒子宽度
		magHeight = getStyles(magWrap, 'height'); //最外层盒子高度
    
    //鼠标滑入
	addEvent(magWrap, 'mouseover', function(e){
		var e = e || window.event;
			imgzoomWrap.className += ' show';
			offsetXY(e);
            //mousemove是鼠标在目标元素上每移动一个像素就会触发
			addEvent(document, 'mousemove', mouseMove);
	})

	//鼠标滑出
	addEvent(magWrap, 'mouseout', mouseOut)
	function mouseMove(e){
				var e = e || window.event,
					isBeyond = true;  //解决左上边界限制问题锁
					offsetXY(e);
				// 限制边界
				if(getXY(e).x > magWidth - imgHalfX || getXY(e).y > magHeight - imgHalfY){
					imgzoomWrap.className = 'imgzoom-wrap';
				}else if(getXY(e).x < -109 && isBeyond){
					imgzoomWrap.className = 'imgzoom-wrap';
					isBeyond = false;
				}else if(getXY(e).y < -109 && isBeyond){
					imgzoomWrap.className = 'imgzoom-wrap';
					isBeyond = false;
				}
	}

	function mouseOut(e){
		imgzoomWrap.className = 'imgzoom-wrap';
		removeEvent(document, 'mousemove', mouseMove);
	}
	//获取x的定位偏移量
	function getXY(e){
		var x = pagePos(e).X - magWrap.offsetLeft - imgHalfX,
			y = pagePos(e).Y - magWrap.offsetTop - imgHalfY;
		return {
			x,
			y
		}
	}
	//操作动态盒子和图片定位
	function offsetXY(e){
		imgzoomWrap.style.left = getXY(e).x + 'px';
		imgzoomWrap.style.top = getXY(e).y + 'px';
		zoomPlus.style.left = -(getXY(e).x) + 'px';
		zoomPlus.style.top = -(getXY(e).y) + 'px'; 
	}
});