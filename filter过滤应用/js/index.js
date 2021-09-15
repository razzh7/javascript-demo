;(function(){
	var oNav = document.getElementById('J_nav'),
		data = JSON.parse(document.getElementById('J_data').innerHTML),
		tpl = document.getElementById('J_tpl').innerHTML,
		oList = document.getElementsByClassName('list')[0];

	function init(){
		oListHTML(data);
		bindEvent();
	}

	function bindEvent(){
		oNav.addEventListener('click', clickNav, false);
	}

	function clickNav(e){
		var e = e || window.event,
			tar = e.target || e.srcElement,
			tagName = tar.tagName.toLowerCase(),  //获取标签名作为点击判断的条件触发
			item = [];
			if(tagName === 'a'){
				var filed = tar.getAttribute('data-filed');
				item = filterTag(data,filed);  //过滤条件给到item数组
				oListHTML(item); //过滤条件item渲染
			}
	}

	function filterTag(data,filed){
		var newArr = data.filter(function(elem){
			switch(filed){
				case 'all':
					return true;
				case 'free':
					return elem.is_free === '1';
				case 'vip':
					return elem.is_free === '0';
				default:
				 	return true;
			}
		})
		return newArr;  //返回符合条件的新数组
	}

	function render(item){
		var list = '',
			len = item.length;

		item.forEach(function(elem){
			list += tpl.replace(/{{(.*?)}}/g, function(node, key){
				return {
					course: elem.course
				}[key];
			})
		})

		return list;
	}
	function oListHTML(data){
		oList.innerHTML = render(data);
	}
	init();
})();