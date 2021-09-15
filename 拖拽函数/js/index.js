/*
 *  1.实现基本拖拽 完成
 *	2.在原型上实现 完成
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