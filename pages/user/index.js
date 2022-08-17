import { userLogin } from '../../api/user';
import {getQuestionHistory} from '../../api/recommend-question'

const app = getApp();
const globalAppInfo = app.globalData.appInfo;

Page({
  data: {
    // 用户信息相关
    isLogin: false,
    nickname: '',
    avatarUrl: '',
    // 用户个人收藏相关
    historyQuestions: null,
    favorQuestions: null,
    questions: [],
    // ui相关
    isRefreshing: false,
    scrollViewHeight: 0,
    noMoreData: false,
    showPopup: false,
    tabbarItems: [
      {text: '历史提问', count: 0}, 
      {text: '收藏', count: 0}
    ],
    activeTabbar: 1,
    popupQuestion: {}
  },
  onLoad: function (options) {
  },
  setScrollViewHeight(){
    setTimeout(() => {
      this.createSelectorQuery().select('.display-scroll-view').boundingClientRect().exec(e => {
        this.setData({
          scrollViewHeight: e[0].height
        })
      });
    }, 0)
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2,
      });
    };
    if(app.globalData.showLoginHint){
      wx.Toast.fail('请先登录');
      app.globalData.showLoginHint = false;
    }

    this.setScrollViewHeight();
    const globalUserInfo = app.globalData.userInfo; 
    this.setData({
      isLogin: globalUserInfo.isLogin,
      nickname: globalUserInfo.nickname,
      avatarUrl: globalUserInfo.avatarUrl,
    });
    // todo 展示历史提问数量
    this.changeUserTabbar({currentTarget: {dataset: {index: 0}}})
  },
  onHide: function () {},
  onUnload: function () {},
  onShareAppMessage: function () {},
  handleLoginTap(e){
    wx.navigateTo({
      url: '/pages/user/login/index',
    })
  },
  onRefresh(){
    if(this.data.activeTabbar === 0){
      this.fetchQuestionHistory().then(() => {
        // fetch history
        this.setData({
          isRefreshing: false
        })
      })
    }
  },
  onQuestionCardTap(e){
    const question = e.target.dataset.question;
    this.setData({
      showPopup: true,
      popupQuestion: question
    })
  },
  closePopup(){
    this.setData({
      showPopup: false
    })
  },
  fetchQuestionHistory(){
    return getQuestionHistory().then(data => {
      const item = this.data.tabbarItems;
      item[0].count = data.length;
      data.forEach(e => {
        // answerType 2和3都是图片
        const answer = e.answerText;
        if(e.answerType === 3 || answer.startsWith('https://') || answer.startsWith('http://')){
          e.answerType = 2;
        }
      })
      this.setData({
        historyQuestions: data,
        questions: data,
        tabbarItems: item
      })
    }).catch(ignore => {});
  },
  changeUserTabbar({currentTarget = {}}){
    const activeIndex = currentTarget.dataset.index;
    this.setData({
      activeTabbar: activeIndex
    })
    if(!this.data.isLogin){
      return;
    }

    if(activeIndex === 0){
      // fetch history
      if(this.data.historyQuestions === null){
        this.fetchQuestionHistory();
      } else {
        this.setData({
          questions: this.data.historyQuestions
        })
      }
    } else if(activeIndex === 1){
      // 收藏的问题
      this.setData({
        questions: this.data.favorQuestions || []
      })
    }
  },
})