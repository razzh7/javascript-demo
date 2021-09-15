window.onload = function(){
	init();
}

function init(){
	keySearch();
}

var keySearch = (function(){
	var sHelper = JSON.parse(document.getElementById('J_shelper').innerHTML),  //获取推荐内容
	    sDisplay = document.getElementById('J_search_dp'), //获取推荐展示框
	    sKeyWords = document.getElementById('J_search_kw'), //获取input框
	    pos = 0,  //sHelper数组下标
	    timer = null;

	addEvent(sKeyWords, 'focus', function(){
		clearInterval(timer);  //聚焦时停止计时器
		sDisplay.style.color = '#ccc';
	});

	addEvent(sKeyWords, 'input', function(){
		isShowDp(this.value);
	});
	//propertychange方法兼容IE
	addEvent(sKeyWords, 'propertychange', function(){
		isShowDp(this.value);
	})

	addEvent(sKeyWords, 'blur', function(){
		clearInterval(timer);  //失去焦点时先停止计时器，防止计时器叠加
		setAuto(true);
		sDisplay.style.color = '#989898';
	});
	/*
	 * 启动自动播放
	 * @param {isBoolean}
	 * 1. true表示从shepler数组第一项开始播放
	 * 2. flase表示直接从shepler暂停的那项开始播放
	 */
	function setAuto(isBoolean){
		if(isBoolean){
			kwChanges();  //在延时器之前更改展示框的内容
		}
		timer = setInterval(function(){
			kwChanges();
		},3000);
	}
	//是否显示展示框
	function isShowDp(val){
		//if sKeyWords没有输入的情况下	
		if(val.length <= 0){
			setAuto(false);
			sDisplay.style.display = 'block';
		}else{
			//sKeyWords输入状态下隐藏sDisplay
			clearInterval(timer);
			sDisplay.style.display = 'none';
		}
	}
    //动态推荐内容
	function kwChanges(){
		var len = sHelper.length;
		sDisplay.innerHTML = sHelper[pos];
		if(pos >= len - 1){
			pos = 0;
		}else{
			pos++;
		}
	}


	return function(){
		setAuto(true);
	}
})();

