var tabItem = document.getElementsByClassName('tab-item');
var pageItem = document.getElementsByClassName('page-item');
console.log(tabItem);
console.log(pageItem);
for(var i = 0; i < tabItem.length; i++){
  (function(j){
    tabItem[j].onclick = function(){
      for(var k = 0; k < tabItem.length; k++){
        tabItem[k].className = 'tab-item';
        pageItem[k].className = 'page-item';
      }
      this.className = 'tab-item cur';
      pageItem[j].className = 'page-item active';
    }
  })(i)
}