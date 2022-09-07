// pages/setting/index.js
import BasePage from '../helpers/base-page'

BasePage({
  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  clearStorage(){
    wx.clearStorage({
      success: (res) => {
        getApp().resetUserInfo();
        wx.showToast({
          title: '清除存储成功',
        })
      },
    })
  },
  printStorage(){
    const s = wx.getStorageInfoSync();
    s.keys.forEach(e => console.log(e, ":", wx.getStorageSync(e)))
  }
})