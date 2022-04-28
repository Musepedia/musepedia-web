// components/search-bar/index.js
Component({
  properties: {
    redirect: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '输入关键字搜索'
    }
  },
  data: {
    value: ''
  },
  methods: {
    clearText(){
      this.setData({
        value: ''
      })
    },
    onSearchBarTap(){
      if(this.data.redirect){
        wx.navigateTo({
          url: this.data.redirect,
        })
      }
    },
    onSearchBarConfirm(){
      this.triggerEvent('confirm', this.data.value);
    },
    onSearchBarInput(){
      this.triggerEvent('input', this.data.value);
    }
  }
})
