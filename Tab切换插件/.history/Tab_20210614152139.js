var tabItem = document.getElementsByClassName('tab-item');
var pageItem = document.getElementsByClassName('page-item');
console.log(tabItem);
console.log(pageItem);
for(var i = 0; i < tabItem.length; i++){
  (function(j){
    tabItem[j].onclick = function(){
      console.log(j);
    }
  })(i)
}