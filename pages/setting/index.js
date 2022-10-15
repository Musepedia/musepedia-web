// pages/setting/index.js
import BasePage from '../helpers/base-page'

const app = getApp();

BasePage({
  data: {
    isLogin: false,
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
        title: '关于我们',
        url: '/pages/about/index',
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
  }
})