import { userLogin } from '../../api/user';

const app = getApp();
const globalAppInfo = app.globalData.appInfo;

Page({
  data: {
    // 用户信息相关
    isLogin: false,
    nickname: '',
    avatarUrl: '',
    // 用户个人收藏相关
    questions: [],
    // ui相关
    isRefreshing: false,
    scrollViewHeight: 0,
    noMoreData: false,
    showPopup: false,
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
        active: 3,
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
    })
  },
  onHide: function () {},
  onUnload: function () {},
  onShareAppMessage: function () {},
  handleLoginTap(e){
    wx.navigateTo({
      url: '/pages/user/login/index',
    })
    // app.userLoginWx().then(data => {
    //   this.setData({
    //     isLogin: true,
    //     nickname: data.nickname,
    //     avatar: data.avatarUrl,
    //   });
    // }).catch(ignore => {})
  },
  fetchData(){
    const questions = [
      'https://images.unsplash.com/photo-1652794878130-d7274e14e244?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1652819192956-5f2177496bbd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500',
      'https://images.unsplash.com/photo-1652819707035-2008e682a64f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500',
      'https://img.zcool.cn/community/01212c5d3811a9a80120695caad9b6.jpg@1280w_1l_2o_100sh.jpg',
      'https://up.2baobao.com/kejian/ppt/images/24484/%E5%B9%BB%E7%81%AF%E7%89%8710.jpg',
      'https://tse1-mm.cn.bing.net/th/id/R-C.10a07d008655eaad2facbdac0148d23c?rik=ZfyMm%2btLOQMfGw&riu=http%3a%2f%2fimg1.gtimg.com%2fkid%2fpics%2fhv1%2f173%2f204%2f1982%2f128931743.png&ehk=%2bRGSG6nsKzkAu9tZKqb8BBNNiqMs0H3JKIM2sRJ%2f0ws%3d&risl=&pid=ImgRaw&r=0'
    ].map(e =>{ return {
      src: e,
      question: '小鼹鼠在哪里鼹鼠在哪里鼹鼠在哪里鼹鼠在哪里',
      answer: 'ans'
    }});
    this.setData({
      // questions: this.data.questions.concat(...questions),
      questions: [],
      isRefreshing: false
    })
  },
  onRefresh(){
    setTimeout(() => {
      this.fetchData();
    }, 1000)
  },
  onQuestionCardTap(e){
    const question = e.target.dataset.question;
    this.setData({
      showPopup: true,
      popupQuestion: {
        question: question.question,
        answer: '使用LCL浇花会导致全球民用铀原料价格上升，从而导致在寝室制备民用核武器难度加大，这对您的校园军备竞赛十分不利',
        src: 'https://bing.wilii.cn/OneDrive/bingimages/2022/05/23//RedBellied_ZH-CN8667089924_1920x1080.jpg'
      }
    })
  },
  closePopup(){
    this.setData({
      showPopup: false
    })
  },
  changeUserTabbar({target}){
    this.setData({
      activeTabbar: target.dataset.index
    })
  }
})