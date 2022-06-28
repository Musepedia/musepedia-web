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
    },
    enableScan: {
      type: Boolean,
      value: true
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
    },
    scanCode(){
      wx.scanCode({
        onlyFromCamera: false,
        scanType: [],
        success: res => {
          console.log(res.result);
          this.triggerEvent('scan', result)
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  }
})
