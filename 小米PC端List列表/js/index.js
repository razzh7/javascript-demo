;(function(doc){
	var oLi = doc.getElementsByClassName('list-item'),
		curInx = 0;
	
	var init = function(){
		bindEvent();
	}

	function bindEvent(){
		for(var i = 0; i < oLi.length; i++){
			addEvent(oLi[i], 'mouseover', function(){
				curInx = Array.prototype.indexOf.call(oLi, this);
				oLi[curInx].className += ' active';
			})

			addEvent(oLi[i], 'mouseout', function(){
				curInx = Array.prototype.indexOf.call(oLi, this);
				oLi[curInx].className = 'list-item';
			})	
		}		
	}

	init();
})(document)