var tabItem = document.getElementsByClassName('tab-item');
var pageItem = document.getElementsByClassName('page-item');
console.log(tabItem);
console.log(pageItem);
for(var i = 0; i < tabItem.length; i++){
  (function(j){
    tabItem[j].onclick = function(){
      tabItem.className = 'tab-item';
    }
    tabItem[j].className = 'tab-item cur';
  })(i)
}