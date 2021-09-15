/**
 * 总体思路
 * 1、先获取data、input框、显示数据的dom
 * 2、使用oninput方式绑定input框，实时监听数据
 * 3、使用reduce结合indexOf处理判断输入的数据是否和data里的数据相符合，并返回数据
 * 4、渲染reduce返回来的数据
 * */
//后续添加节流操作
; (function (doc) {
	var data = JSON.parse(doc.getElementById('J_data').innerHTML),
		oText = doc.getElementById('J_text'),
		oInput = doc.getElementById('J_input');
	function init() {
		bindEvent();
	}
	function bindEvent() {
		oInput.addEventListener('input', inputText, false)
	}

	function inputText(e) {
		var e = e || window.event,
			val = this.value;

		if (val.length > 0) {
			if (getkeywords(data, val).length > 0) {
				var courseData = getkeywords(data, val);  //返回搜索数据
				render(courseData);  //调用渲染函数渲染数据
			} else {
				oText.innerHTML = '<span>- 暂无信息 -</span>';
			}

		} else {
			oText.innerHTML = '<span>- 暂无信息 -</span>';
		}
	}
	//匹配关键字
	function getkeywords(data, keywords) {
		var nana = data.reduce(function (prev, elem) {
			var res = elem.goods.indexOf(keywords);  //JSON数据中是否存在输入的关键字
			if (res !== -1) {
				prev.push(elem.goods);  //如果存在就在新数组中push数据
			}

			return prev;
		}, [])
		return nana;
	}

	function render(data) {
		var list = ''

		data.forEach(function (elem) {
			list += '<li>' + elem + '</li>';
		})

		oText.innerHTML = list;
	}

	init();

})(document);