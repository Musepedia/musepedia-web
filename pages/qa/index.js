import {getAnswer} from '../../api/question'
import {getExhibitInfoById} from '../../api/exhibit'
import {CommonMessage, RecommendMessage, ImageReplyMessage, TimeMessage, HintMessage, HallMessage} from '../../utils/message-builder'

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
    detialText: '',
    // 历史记录
    historyIndex: 0,
    history: [],
    reachHistoryEnd: false,
    showHistoryHint: false
  },
  onLoad: function (options) {
    this.messageComponent || (this.messageComponent = this.selectComponent('#qa-message-component'));
  },
  onReady: function () {
    
  },
  onShow: function () {
    this.messageComponent.resetKeyboard();
    const userInfo = getApp().globalData.userInfo;
    const history = wx.getStorageSync('qaHistory') || [];
    this.setData({
      isLogin: userInfo.isLogin,
      nickname: userInfo.nickname,
      avatar: userInfo.avatar,
      history: history,
      historyIndex: history.length
    });
  },
  onHide: function () {
  },
  onUnload: function () {
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
  checkMessageInterval(){
    const now = new Date().getTime();
    this.setData({
      lastMessageTime: now
    });
    return now - this.data.lastMessageTime > 120000;
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
    if(!(text && text.trim().length)){
      // empty string
      return;
    }
    if (!this.checkLogin()) {
      this.forceLogin();
      return;
    }
    clear();
    const messages = [CommonMessage(text, this.data.avatar, true)];
    if(this.checkMessageInterval(messages)){
      messages.unshift(TimeMessage());
    }
    this.pushMessage(...messages);
    this.messageComponent.scrollToBottom();
    // do request
    getAnswer(text).then(data => {
      data.isReply = true;

      const isImgReply = data.status === 2 || data.status === 3 
        || data.answer.startsWith('https://') 
        || data.answer.startsWith('http://');

      const answerMsg = isImgReply ? ImageReplyMessage(data) : RecommendMessage(
        data.answer, 
        // 'https://www.shanghaimuseum.net/mu/site/img/favicon.ico', 
        '',  // 展馆头像暂不显示
        data.status ? '更多推荐:' : '可以试试这样问:', 
        data.recommendQuestions, 
        data
      );

      // save history
      this.data.history.push([...messages, answerMsg]);
      wx.setStorage({
        key: 'qaHistory',
        data: this.data.history
      });

      this.pushMessage(answerMsg);
      this.messageComponent.scrollToBottom();

      // 推荐展区信息
      this.pushMessage(HintMessage('推荐展区', true));
      this.pushMessage(HallMessage({src: 'https://abstractmgs.cn/figs/驼鹿.jpg', text: '生命CHANG和'}));
    }).catch(err => {
      wx.Toast.fail('请求失败')
    })
  },
  fetchHistory({detail}){
    const done = detail.done;

    const data = this.data.history;
    const hi = this.data.historyIndex;
    const fetchCount = 3, fromIndex = Math.max(hi - fetchCount, 0);
    const historySlice = data.slice(fromIndex, hi).flat();

    if(!this.data.showHistoryHint && historySlice.length > 0){
      historySlice.push(HintMessage('以上为历史消息', true))
      this.data.showHistoryHint = true;
    }
    if(hi - fetchCount <= 0 && !this.data.reachHistoryEnd){
      historySlice.unshift(HintMessage('没有更多消息了', true));
      this.data.reachHistoryEnd = true;
    }
    this.unshiftMessage(...historySlice);
    this.data.historyIndex = fromIndex;

    done();
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