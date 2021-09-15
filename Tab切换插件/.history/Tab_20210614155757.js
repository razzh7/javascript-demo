// var tabItem = document.getElementsByClassName('tab-item');
// var pageItem = document.getElementsByClassName('page-item');
// for(var i = 0; i < tabItem.length; i++){
//   (function(j){
//     tabItem[j].onclick = function(){
//       for(var k = 0; k < tabItem.length; k++){
//         tabItem[k].className = 'tab-item';
//         pageItem[k].className = 'page-item';
//       }
//       this.className = 'tab-item cur';
//       pageItem[j].className = 'page-item active';
//     }
//   })(i)
// }
;(function(){
  var Tab = function(opt){
    this.tabItem = document.getElementsByClassName(opt.tabItem);
    this.pageItem = document.getElementsByClassName(opt.pageItem);
  }
  Tab.prototype.bindTab = function(){
    var tabItem = this.tabItem;
    var pageItem = this.pageItem;
    for(var i = 0; i < tabItem.length; i++){
      (function(j){
        tabItem[j].onclick = function(){
          console.log(j);
        }
      })(i)
    }
  }
  window.Tab = Tab;
})()
