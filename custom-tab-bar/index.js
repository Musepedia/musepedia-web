Page({
  data: {
    active: 0,
    paths: [
      '/pages/index/index',
      '/pages/explore/index',
      '/pages/user/index'
    ]
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
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onChange(event) {
    const index = event.detail;
    wx.switchTab({url:this.data.paths[index]});
  },
})