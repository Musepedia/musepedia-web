// components/message-component/index.js
const app = getApp();
Component({
  properties: {
    messages: {
      type: Array,
      value: []
    }
  },
  data: {
    keyboardHeight: 0,
    keyboardHeightChangeHandler: null, // 处理键盘弹起时对话框的偏移
    showAdditionalInput: false,
    additionalInputHeight: 150, // 表情等额外输入框高度，用于设置对话框偏移
    message: '', // 输入框中的消息,
    messageComponent: {
      'common': 'common-message',
    },
    bottomAnchor: 'bottom-anchor', // 底部锚点，用于滚动到对话框最下方
    isiPhoneX: app.globalData.isiPhoneX
  },
  lifetimes:{
    // 键盘抬起放下监听器
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
        keyboardHeight: detail.height,
        showAdditionalInput: false
      })
    },
    openAdditionalInput(){
      this.setData({
        showAdditionalInput: true,
      })
    },
    closeAdditionalInput(){
      this.setData({
        showAdditionalInput: false
      })
    },
    onMessageInput({detail}){
      this.setData({
        message: detail.value
      })
    },
    sendMessage(){
      this.triggerEvent('sendmessage', {
        text: this.data.message,
        clear: this.clearText.bind(this)
      });
    },
    clearText(){
      this.setData({
        message: ''
      })
    }
  },
  observers: {
    messages(v){
      this.setData({
        bottomAnchor: `message-${v.length-1}`
      })
    }
  }
})
