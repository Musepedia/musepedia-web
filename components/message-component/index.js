// components/message-component/index.js
const app = getApp();
let bindedClearText;
let bindedCompleteRefresh;
let bindedScrollToBottom;
Component({
  properties: {
    messages: {
      type: Array,
      value: []
    }
  },
  data: {
    isRefreshing: false,
    keyboardHeight: 0,
    keyboardHeightChangeHandler: null, // 处理键盘弹起时对话框的偏移
    showAdditionalInput: false,
    additionalInputHeight: 150, // 表情等额外输入框高度，用于设置对话框偏移
    message: '', // 输入框中的消息,
    messageComponent: {
      'common': 'common-message',
      'recommend': 'common-message-recommend'
    },
    bottomAnchor: 'bottom-anchor', // 底部锚点，用于滚动到对话框最下方
  },
  lifetimes:{
    attached(){
      // 初始化事件回调函数
      bindedClearText || (bindedClearText = this.clearText.bind(this));
      bindedCompleteRefresh || (bindedCompleteRefresh = this.completeRefresh.bind(this));
      bindedScrollToBottom || (bindedScrollToBottom = this.scrollToBottom.bind(this));
      
      // 键盘抬起放下监听器
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
    onRefresh(){
      // if (this._freshing) return;
      // this._freshing = true;
      this.triggerEvent('refresh', {
        done: bindedCompleteRefresh
      })
    },
    sendMessage(event){
      const dataset = event.target.dataset;

      let text = this.data.message;
      let showRecommend = true;
      if(dataset.message){
        // 通过DOM点击事件调用时使用点击事件的参数，默认使用输入框中文字
        text = dataset.message;
        showRecommend = false; // 设计为通过推荐发送的消息不触发推荐
      }
      this.triggerEvent('sendmessage', {
        text: text,
        clear: bindedClearText,
        showRecommend: showRecommend
      });
    },
    clearText(){
      this.setData({
        message: ''
      })
    },
    completeRefresh(){
      this.setData({
        isRefreshing: false
      });
    },
    scrollToBottom(){
      const len = this.data.messages.length;
      this.setData({
        bottomAnchor: `message-${len-1}`
      });
    }
  },
  observers: {
    messages(v){
      // this.setData({
      //   bottomAnchor: `message-${v.length-1}`
      // })
    }
  }
})
