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
  questionMessage(question){
    return CommonMessage(question, this.data.avatar, true);
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
    const last = this.data.lastMessageTime;
    this.data.lastMessageTime = now;
    return now - last > 120000;
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
    const {text: question, clear} = detail;
    if(!(question && question.trim().length)){
      // empty string
      return;
    }
    if (!this.checkLogin()) {
      this.forceLogin();
      return;
    }
    clear();
    const messages = [this.questionMessage(question)];
    if(this.checkMessageInterval()){
      console.log('d');
      messages.unshift(TimeMessage());
    }
    this.pushMessage(...messages);
    this.messageComponent.scrollToBottom();
    // get answer
    getAnswer(question).then(data => {
      data.isReply = true;
      data.question = question;

      const isImgReply = data.status === 2 || data.status === 3 
        || data.answer.startsWith('https://') 
        || data.answer.startsWith('http://');
      isImgReply && (data.status = 2);

      const answerMsg = isImgReply ? ImageReplyMessage(data) : RecommendMessage(
        // 'https://www.shanghaimuseum.net/mu/site/img/favicon.ico', 
        '',  // 展馆头像暂不显示
        data
      );

      // save history
      // TODO 优化存储方式
      if(messages.length > 1){
        // 记录时间消息
        answerMsg.time = messages[0].text;
      }
      this.data.history.push([answerMsg]);
      if(this.data.history.length >= 512){
        this.data.history.shift();
      }
      wx.setStorage({
        key: 'qaHistory',
        data: this.data.history
      });

      this.pushMessage(answerMsg);
      this.messageComponent.scrollToBottom();

      // 推荐展区信息
      // this.pushMessage(HintMessage('推荐展区', true));
      // this.pushMessage(HallMessage({src: 'https://abstractmgs.cn/figs/驼鹿.jpg', text: '生命CHANG和'}));
    }).catch(err => {
      wx.Toast.fail('请求失败')
    })
  },
  fetchHistory({detail}){
    const done = detail.done;

    const hi = this.data.historyIndex;
    const fetchCount = 3, fromIndex = Math.max(hi - fetchCount, 0);
    // 截取三条记录
    const data = this.data.history.slice(fromIndex, hi);
    data.forEach(h => {
      const his = h[0];
      if(his.data && his.data.question){
        h.unshift(this.questionMessage(his.data.question));
      }
      if(his.time){
        h.unshift(TimeMessage(his.time));
      }
    })
    const historySlice = data.flat();

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