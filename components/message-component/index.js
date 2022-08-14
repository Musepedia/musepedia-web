// components/message-component/index.js
const app = getApp();
let bindedClearText;
let bindedCompleteRefresh;
let bindedScrollToBottom;
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    messages: {
      type: Array,
      value: []
    }
  },
  data: {
    textareaConfig: {
      maxHeight: 60,
    },
    isRefreshing: false,
    keyboardHeight: 0,
    keyboardHeightChangeHandler: null, // 处理键盘弹起时对话框的偏移
    showAdditionalInput: false,
    additionalInputHeight: 100, // 表情等额外输入框高度，用于设置对话框偏移
    message: '', // 输入框中的消息,
    messageComponent: {
      'common': 'common-message',
      'recommend': 'common-message-recommend',
      'hint': 'hint-message',
      'imgReply': 'reply-img-message',
      'hallMessage': 'hall-message'
    },
    // ui
    bottomAnchor: 'bottom-anchor', // 底部锚点，用于滚动到对话框最下方,
    isiPhoneX: app.globalData.isiPhoneX,
    showQuestionCard: false,
    popupQuestion: {}
  },
  lifetimes:{
    attached(){
      // 初始化事件回调函数
      bindedClearText = this.clearText.bind(this);
      bindedCompleteRefresh = this.completeRefresh.bind(this);
      bindedScrollToBottom = this.scrollToBottom.bind(this);
      
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
        // keyboardHeight: 0
      });
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
      this.triggerEvent('refresh', {
        done: bindedCompleteRefresh
      })
    },
    scanCode(){
      wx.scanCode({
        onlyFromCamera: false,
        scanType: [],
        success: (res) => {
          console.log(res.result);
          wx.Toast.success('scan result: ' + res.result);
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    },
    sendMessage(event){
      const dataset = event.target.dataset;

      // 通过DOM点击事件调用时使用点击事件的参数，默认使用输入框中文字
      const text = dataset.message || this.data.message;

      this.triggerEvent('sendmessage', {
        text: text,
        clear: bindedClearText,
      });
    },
    /**
     * 通过点击推荐问题发送消息
     */
    sendRecMessage(event){
      this.setData({
        showQuestionCard: false
      })
      this.sendMessage(event);
    },
    clearText(){
      this.setData({
        message: ''
      })
    },
    completeRefresh(){
      // this._freshing = false;
      this.setData({
        isRefreshing: false
      });
    },
    scrollToBottom(){
      const len = this.data.messages.length;
      this.setData({
        bottomAnchor: `message-${len-1}`
      });
    },
    resetKeyboard(){
      this.setData({
        keyboardHeight: 0
      });
    },
    onMessageInputBlur(){
      // this.setData({
      //   keyboardHeight: 0
      // })
    },
    onDetailTap(event){
      const dataset = event.target.dataset;
      this.triggerEvent('detailtap', {
        data: dataset.data,
      });
    },
    previewImage(event){
      wx.previewImage({
        urls: [event.target.dataset.src],
      })
    },
    showQuestionCardPopup(e){
      const data = e.target.dataset.data;
      console.log(data);
      this.setData({
        popupQuestion: {
          src: data.status === 2 ? data.answer : '',
          questionId: data.questionId,
          question: data.question,
          answer: data.status === 2 ? '' : data.answer,
          recommendQuestions: data.recommendQuestions
        },
        showQuestionCard: true
      })
    },
    closePopup(){
      this.setData({
        showQuestionCard: false
      })
    }
  }
})
