// index.js
// 获取应用实例
const app = getApp()

Page({
  options: {
    addGlobalClass: true
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    showPopupMap: false
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
