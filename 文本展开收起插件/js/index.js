;(function() {
  class ExpendText {
    constructor(opt) {
      this.div = document.getElementsByClassName(opt.wrapper)[0];
      this.dHeight = window.getComputedStyle(this.div, null).height; //保存wrapper初始高度
      this.text = document.getElementsByClassName(opt.text)[0];
      this.dText = window.getComputedStyle(this.text, null).height, //保存text初始高度
      this.oSpan = document.getElementsByClassName(opt.stretch)[0];
      this.dLine = this.getLineTotal(this.div); //父盒子元素行数
      this.tLine = this.getLineTotal(this.text); //子盒子元素行数
    
      let _self = this;
      this.oSpan.addEventListener('click',function() {
        _self.expend();
      },false)
      this.initLine(this.div) //立刻设置截取行数
    }
    //元素内的行数
    getLineTotal(el) {
      let styles = window.getComputedStyle(el, null);
      let totalHeight = styles.height.replace('px', '');
      let lineHeight = styles.lineHeight.replace('px', '');
      return Math.floor(totalHeight / lineHeight);
    }
    //初始化行数————设置截取行数
    initLine(el) {
      if(this.tLine > this.dLine) {
        this.text.style.webkitLineClamp = this.getLineTotal(el); 
      }
    }
    //展开逻辑
    expend() {
      if(this.oSpan.innerText == '展开') {
        this.text.style.webkitLineClamp = this.tLine; //设置父盒子的截取行数和子盒子行数相同
        this.div.style.height = this.dText; //父盒子高度设置成子盒子的原先高度
        this.oSpan.textContent = '收起';
      }else {
        this.text.style.webkitLineClamp = this.dLine; //设置子盒子的截取行数和父盒子行数相同
        this.div.style.height = this.dHeight; ////子盒子高度设置成父盒子的原先高度
        this.oSpan.textContent = '展开';
      }
    }
  }  
  window.ExpendText = ExpendText;
})();
