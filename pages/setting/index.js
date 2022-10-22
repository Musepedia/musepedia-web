// pages/setting/index.js
import BasePage from '../helpers/base-page'

const app = getApp();

BasePage({
  data: {
    isLogin: false,
    wjSid: '10970457',
    wjHash: '64f7',
    linkSettings: [
      {
        title: '当前博物馆',
        url: '/pages/switch-museum/index'
      },
      {
        title: '展区偏好',
        url: 'preference/index',
        requireLogin: true
      },
      {
        title: '个人信息',
        url: 'profile/index',
        requireLogin: true
      },
      {
        title: '字体设置',
        url: 'font/index',
      }
    ]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      isLogin: app.checkLogin()
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  clearStorage(){
    const doClear = () => wx.clearStorage({
      success: (res) => {
        getApp().resetUserInfo();
        wx.showToast({
          title: '清除存储成功',
        })
      },
    });

    wx.showModal({
      title: '提示',
      content: '确定要清除本地存储吗？',
      success: res => {
        if (res.confirm) {
          doClear();
        }
      }
    })

  },
  printStorage(){
    const s = wx.getStorageInfoSync();
    s.keys.forEach(e => console.log(e, ":", wx.getStorageSync(e)))
  },
  sendFeedback(){
    wx.navigateToMiniProgram({
      appId: "wxebadf544ddae62cb",
      path: `pages/survey/index?sid=${this.data.wjSid}&hash=${this.data.wjHash}&navigateBackMiniProgram=true`
    }).catch(ignore => {})
  }
})