import {getAnswer} from '../../api/question'
import {getExhibitInfoById} from '../../api/exhibit'
import {CommonMessage, RecommendMessage, TimeMessage} from '../../utils/message-builder'

const app = getApp();
const globalUserInfo = app.globalData.userInfo;

Page({
  data: {
    isLogin: false,
    messages: [],
    lastMessageTime: 0,
    nickname: '',
    avatar: '',

    displayInfo: false,
    exhibitLabel: '',
    exhibitDescription: '',
    exhibitUrl: '',
    /**回答的详细介绍 */
    showDetailText: false,
    detialText: ''
  },
  onLoad: function (options) {
    this.messageComponent || (this.messageComponent = this.selectComponent('#qa-message-component'));
  },
  onReady: function () {
    
  },
  onShow: function () {
    this.messageComponent.resetKeyboard();
    const userInfo = getApp().globalData.userInfo;
    this.setData({
      isLogin: userInfo.isLogin,
      nickname: userInfo.nickname,
      avatar: userInfo.avatar
    })
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
  checkLogin() {
    // 判断用户是否登录
    return this.data.isLogin;
  },
  forceLogin() {
    // 跳转到登录页面
    wx.switchTab({
      url: '../user/index',
    })
    wx.showToast({
      title: '请先登录',
      icon: 'error'
    })
  },
  scanCode(){
    if (!this.checkLogin()) {
      this.forceLogin();
      return ;
    }
    wx.scanCode({
      onlyFromCamera: false,
      scanType: [],
      success: (res) => {
        getExhibitInfoById(res.result).then(data => {
          console.log(data);
          this.setData({
            exhibitLabel: data.label,
            exhibitDescription: data.description,
            exhibitUrl: data.url
          });
          this.display();
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  checkMessageInterval(messages){
    const now = new Date().getTime();
    if(now - this.data.lastMessageTime > 120000){
      messages.unshift(TimeMessage());
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
    // if (!this.checkLogin()) {
    //   this.forceLogin();
    //   return ;
    // }
    clear();
    const messages = [CommonMessage(text, this.data.avatar, true)];
    this.checkMessageInterval(messages);
    this.pushMessage(...messages);
    this.messageComponent.scrollToBottom();
    // do request
    getAnswer(text).then(data => {
      this.pushMessage(RecommendMessage(
        data.answer, 
        // 'https://www.shanghaimuseum.net/mu/site/img/favicon.ico', 
        '',  // 展馆头像暂不显示
        data.status ? '更多推荐:' : '可以试试这样问:', 
        data.recommendQuestions, 
        data));
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
  },
  display() {
    this.setData({
      displayInfo: true
    })
  },
  closeDetailTextPopup(){
    this.setData({
      showDetailText:false
    })
  },
  showDetailTextPopup(event){
    const data = event.detail.data;
    const detailText = data.text.replace(data.answer, `<span style="background-color:yellow;">${data.answer}</span>`)
    this.setData({
      showDetailText: true,
      detailText: detailText
    })
  }
})