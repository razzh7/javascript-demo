var tabItem = document.getElementsByClassName('tab-item');
var pageItem = document.getElementsByClassName('page-item');
console.log(tabItem);
console.log(pageItem);
for(var i = 0; i < tabItem.length; i++){
  tabItem[i].onclick = function(){
    console.log(i);
  }
}