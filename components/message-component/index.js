// components/message-component/index.js
Component({
  properties: {
    messages: Array
  },
  data: {
    keyboardHeight: 0,
    keyboardHeightChangeHandler: null
  },
  lifetimes:{
    attached(){
      const handler = ((result) => {
        this.setData({
          keyboardHeight: result.height
        })
      }).bind(this);
      this.setData({
        keyboardHeightChangeHandler: handler
      })
      wx.onKeyboardHeightChange(handler)
    },
    detached(){
      wx.offKeyboardHeightChange(this.data.keyboardHeightChangeHandler)
    }
  },
  methods: {
    onFocus({detail}){
      this.setData({
        keyboardHeight: detail.height
      })
    },
    onBlur(){
      this.setData({
        keyboardHeight: 0
      })
    },
  }
})
