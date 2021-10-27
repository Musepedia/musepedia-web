import {getAnswer} from '../../api/question'

Page({
  data: {
    messages: [],
  },
  onLoad: function (options) {
    this.messageComponent || (this.messageComponent = this.selectComponent('#qa-message-component'));
  },
  onReady: function () {

  },
  onShow: function () {
    this.messageComponent.resetKeyboard();
  },
  onHide: function () {
  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onMessage({detail}){
    const {text, clear} = detail;
    let valid = text && text.trim().length;
    if(!valid){
      return;
    }
    clear();
    this.setData({
      messages: this.data.messages.concat({
        avatar: 'http://sornk.cn/wp-content/uploads/2020/11/cropped-IMG_5289.jpg',
        text: text,
        right: true,
        type: 'common'
      })
    });
    this.messageComponent.scrollToBottom();
    // do request
    getAnswer(text).then(data => {
      this.setData({
        messages: this.data.messages.concat({
          avatar: 'https://www.neptu.cn/uploads/img/1623154552723-84596340_p0_master1200.jpg',
          text: data.answer,
          right: false,
          fullWidth: true,
          type: 'recommend',
          recommendHint: data.status ? '更多推荐:' : '可以试试这样问:',
          recommends: data.recommendQuestions
        })
      });
      this.messageComponent.scrollToBottom();
    }).catch(ignore => {})
  },
  onRefresh({detail}){
    const done = detail.done;
    const oldMsg = {
      avatar: 'https://www.neptu.cn/uploads/img/1623154552723-84596340_p0_master1200.jpg',
      text: 'Old meSSagE',
      right: false,
      fullWidth: true,
      type: 'common'
    };
    setTimeout(() => {
      this.setData({
        messages: [oldMsg].concat(this.data.messages)
      });
      done();
    }, 1000)
  }
})