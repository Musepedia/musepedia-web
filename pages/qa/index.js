import {getAnswer} from '../../api/question'
import {TimeInfo} from '../../utils/message-builder'

Page({
  data: {
    messages: [],
    lastMessageTime: 0,
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
  checkMessageInterval(messages){
    const now = new Date().getTime();
    if(now - this.data.lastMessageTime > 120000){
      messages.unshift(TimeInfo());
    }
    this.setData({
      lastMessageTime: now
    })
  },
  pushMessage(...messages){
    this.setData({
      messages: this.data.messages.concat(messages)
    })
  },
  unshiftMessage(...messages){
    this.setData({
      messages: messages.concat(this.data.messages)
    });
  },
  onMessage({detail}){
    const {text, clear} = detail;
    let valid = text && text.trim().length;
    if(!valid){
      return;
    }
    clear();
    const messages = [{
      avatar: 'http://sornk.cn/wp-content/uploads/2020/11/cropped-IMG_5289.jpg',
      text: text,
      right: true,
      fullWidth: false,
      transparent: false,
      textCenter: false,
      type: 'common'
    }];
    this.checkMessageInterval(messages);
    this.pushMessage(...messages);
    this.messageComponent.scrollToBottom();
    // do request
    getAnswer(text).then(data => {
      this.pushMessage({
        avatar: 'https://www.shanghaimuseum.net/mu/site/img/favicon.ico',
        text: data.answer,
        right: false,
        fullWidth: true,
        transparent: false,
        textCenter: false,
        type: 'recommend',
        recommendHint: data.status ? '更多推荐:' : '可以试试这样问:',
        recommends: data.recommendQuestions
      })
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
      transparent: false,
      textCenter: false,
      type: 'common'
    };
    setTimeout(() => {
      this.unshiftMessage(oldMsg);
      done();
    }, 1000)
  }
})