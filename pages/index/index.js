// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  onReady(){
    this.getInitPreference();
  },
  /**
   * 用户首次使用小程序，获取用户偏好
   */
  getInitPreference(){
    const isInit = !wx.getStorageSync('initPreference');
    if(isInit){
      wx.setStorageSync('initPreference', true);
      wx.navigateTo({
        url: '/pages/setting/preference/index',
      })
    }
  },
  scanCode(){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: [],
      success: (result) => {
        console.log(result);
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})
