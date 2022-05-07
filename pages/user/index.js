import { userLogin } from '../../api/user';
import {wxLoginWithBackend} from '../../utils/util'

const app = getApp();
const globalAppInfo = app.globalData.appInfo;

Page({
  data: {
    // 用户信息相关
    isLogin: false,
    nickname: '',
    avatar: '',
    // 用户个人收藏相关
    data: [],
    // ui相关
    scrollViewHeight: 0
  },
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  setScrollViewHeight(){
    setTimeout(() => {
      this.createSelectorQuery().select('.display-scroll-view').boundingClientRect().exec(e => {
        this.setData({
          scrollViewHeight: e[0].height
        })
        console.log('sv:',e[0]);
      });
    }, 0)
    
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 3,
      });
    };
    this.setScrollViewHeight();
    const globalUserInfo = app.globalData.userInfo; 
    this.setData({
      isLogin: globalUserInfo.isLogin,
      nickname: globalUserInfo.nickname,
      avatar: globalUserInfo.avatar,
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onShareAppMessage: function () {

  },
  handleLoginTap(e){
    wxLoginWithBackend().then(data => {
      wx.Toast.success('登录成功');
      app.setGlobalUserInfo(data);
      this.setData({
        isLogin: true,
        nickname: data.nickname,
        avatar: data.avatarUrl,
      });
      // 初次登陆设置偏好
      if(!wx.getStorageSync('initPreference')){
        wx.setStorageSync('initPreference', true);
        wx.navigateTo({
          url: '/pages/setting/preference/index',
        })
      }
      // 记录用户是否曾经授权登录过
      // 如果授权过会在小程序启动时尝试获取用户信息
      wx.setStorageSync('registered', true);
    }).catch(ignore => {})
  },
  fetchData(){
    this.setData({
      data: this.data.data.concat('asd')
    })
  }
})