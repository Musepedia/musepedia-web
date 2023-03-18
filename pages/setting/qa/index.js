// pages/setting/qa/index.js
Page({
  data: {
    useGpt: false
  },
  onLoad: function (options) {},
  onShow: function () {
    this.setData({
      useGpt: wx.getStorageSync('useGpt') || false
    })
  },
  changeGptOption({detail}){
    wx.setStorageSync('useGpt', detail)
    this.setData({
      useGpt: detail
    })
  }
})