import BasePage from '../helpers/base-page'
import {getQuestionHistory} from '../../api/recommend-question'

const app = getApp();

BasePage({
  data: {
    // 用户信息相关
    isLogin: false,
    nickname: '',
    avatarUrl: app.globalData.defaultAvatarUrl,
    doingLogin: false, // 是否正在登陆
    // 用户个人收藏相关
    historyQuestions: null,
    favorQuestions: null,
    questions: [],
    // ui相关
    isRefreshing: false,
    loading: false,
    scrollViewHeight: 0,
    noMoreData: false,
    showPopup: false,
    tabbarItems: [
      {text: '历史提问', count: 0}, 
      // {text: '收藏', count: 0}
    ],
    activeTabbar: 1,
    popupQuestion: {}
  },
  onReady(){
    app.$on('user.login.finish', () => {
      this.setData({
        doingLogin: false
      })
      this.updateUserInfo();
    })
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
    // 未登录跳转过来的传参
    if(app.globalData.showLoginHint){
      wx.Toast.fail('请先登录');
      app.globalData.showLoginHint = false;
    }

    this.setScrollViewHeight();
    this.setData({
      doingLogin: app.globalData.doingLogin
    })
    if(!this.data.doingLogin){
      this.updateUserInfo();
    }
  },
  onHide: function () {},
  onUnload: function () {},
  /**
   * 更新界面显示的用户信息并且获取历史提问/收藏
   */
  updateUserInfo(){
    const globalUserInfo = app.globalData.userInfo; 
    this.setData({
      isLogin: globalUserInfo.isLogin,
      nickname: globalUserInfo.nickname,
      avatarUrl: globalUserInfo.avatarUrl,
    });
    if(!globalUserInfo.isLogin){
      this.resetTabbarItems();
    }
    this.changeUserTabbarIndex(0);
  },
  /**
   * 重新设置 历史提问/收藏 数据
   */
  resetTabbarItems(){
    this.setData({
      tabbarItems: [
        {text: '历史提问', count: 0}, 
        // {text: '收藏', count: 0}
      ],
      questions: []
    })
  },
  handleLoginTap(e){
    if(this.data.doingLogin){
      return;
    }
    wx.navigateTo({
      url: '/pages/user/login/index',
    })
  },
  onRefresh(){
    if(this.data.activeTabbar === 0){
      // 用户选择'历史提问'
      this.fetchQuestionHistory().finally(() => {
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
    const popup = this.selectComponent('#popup-question-card');
    if(popup){
      const action = popup.selectComponent('.question-card-action');
      action && action.setData({
        showPopover: false
      })
    }
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
    this.changeUserTabbarIndex(activeIndex);
  },
  /**
   * 切换历史提问/收藏一栏，同时会刷新切换到那一栏的数据
   * @param {Number} activeIndex
   */
  changeUserTabbarIndex(activeIndex = 0){
    this.setData({
      activeTabbar: activeIndex
    })
    if(!this.data.isLogin){
      return;
    }

    if(activeIndex === 0){
      // 历史提问
      this.fetchQuestionHistory();
    } else if(activeIndex === 1){
      // 收藏的问题
      this.setData({
        questions: this.data.favorQuestions || []
      })
    }
  }
})