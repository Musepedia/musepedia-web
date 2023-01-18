import BasePage from '../helpers/base-page'
import {getAnswer} from '../../api/question'
import {getExhibitInfoById} from '../../api/exhibit'
import {recommendCreative} from '../../api/creative'
import {CommonMessage, RecommendMessage, ImageReplyMessage, TimeMessage, HintMessage, HallMessage} from '../../utils/message-builder'

const app = getApp();
const globalUserInfo = app.globalData.userInfo;

const shouldRecommendCreative = (() => {
  let i = 3;
  return function(){
    i--;
    if(i === 0){
      i = (Math.random() * 12) + 12;
      return true;
    }
    return false;
  }
})()

BasePage({
  data: {
    isLogin: false,
    nickname: '',
    avatar: '',
    messages: [],
    lastMessageTime: 0,
    showSwitchMuseumPopup: false,
    pendingMessages: 0,

    displayInfo: false,
    exhibitLabel: '',
    exhibitDescription: '',
    exhibitUrl: '',
    // 回答的详细介绍
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
    app.checkLogin(true);

    // 未选择博物馆则弹窗提示
    if(!app.getCurrentMuseumId()){
      this.setData({
        showSwitchMuseumPopup: true
      })
    }

    this.messageComponent.resetKeyboard();
    const userInfo = getApp().globalData.userInfo;
    const history = wx.getStorageSync('qaHistory') || [];
    this.setData({
      isLogin: userInfo.isLogin,
      nickname: userInfo.nickname,
      avatar: userInfo.avatarUrl,
      history: history,
      historyIndex: history.length
    });
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  closeSwitchMuseumPopup(){
    wx.navigateTo({
      url: '/pages/switch-museum/index',
    });
    this.setData({
      showSwitchMuseumPopup: false
    })
  },
  questionMessage(question){
    return CommonMessage(question, this.data.avatar, true);
  },
  scanCode(){
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
  // 检查两次消息之间是否需要超过一定间隔（显示时间消息）
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
  // 用户发送消息回调
  onMessage({detail}){
    const {text: question, clear} = detail;
    if(!(question && question.trim().length)){
      // empty string
      return;
    }
    clear();
    const messages = [this.questionMessage(question)];
    if(this.checkMessageInterval()){
      messages.unshift(TimeMessage());
    }
    this.pushMessage(...messages);
    // get answer
    this.setData({
      pendingMessages: this.data.pendingMessages + 1
    });
    this.messageComponent.scrollToBottom();
    getAnswer(question).then(data => {
      data.isReply = true;
      data.question = question;

      const isImgReply = data.status === 2 || data.status === 3 
        || data.answer.startsWith('https://') 
        || data.answer.startsWith('http://');
      isImgReply && (data.status = 2);

      const answerMsg = isImgReply 
      ? ImageReplyMessage('/assets/icons/M2.png', data) 
      : RecommendMessage('/assets/icons/M2.png', data);

      // 本地保存历史消息
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

      // 推荐展区信息
      // data.recommendExhibitionHall = {imageUrl: 'https://static.musepedia.cn/figs/驼鹿.jpg', name: '生命长河'}
      const hall = data.recommendExhibitionHall;
      if(hall){
        this.pushMessage(HintMessage('推荐展区', true));
        this.pushMessage(HallMessage({img: hall.imageUrl, title: hall.name}));
      } else {
        // 不推荐展区的情况下推荐文创
        if(shouldRecommendCreative()){
          const museumId = app.getCurrentMuseumId();
          recommendCreative({museumId: museumId}).then(data => {
            if(!data){
              return;
            }
            this.pushMessage(HintMessage('推荐文创', true));
            this.pushMessage(HallMessage({
              img: data.imageList[0], 
              title: data.name,
              content: data.description
            }));
            this.messageComponent.scrollToBottom();
          })
        }
      }
      
      this.messageComponent.scrollToBottom();
    }).catch(err => {
      wx.Toast.fail('请求失败')
    }).finally(() => {
      this.setData({
        pendingMessages: this.data.pendingMessages - 1
      })
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