// components/search-bar/index.js
Component({
  properties: {
    redirect: {
      type: String,
      value: ''
    },
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
