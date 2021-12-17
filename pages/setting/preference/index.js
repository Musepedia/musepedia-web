// pages/preference/index.js
Page({
  data: {
    preferenceSettings: [
      {},{},{},{}
    ],
    currentIndex: 0,
    hideSkipButton: false
  },
  onLoad: function (options) {
    this.setData({
      hideSkipButton: !!options.hideSkipButton
    })
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  previousPage(){
    const idx = this.data.currentIndex;
    idx > 0 && this.setData({currentIndex: idx - 1});
  },
  nextPage(){
    const data = this.data;
    const idx = data.currentIndex;
    idx < data.preferenceSettings.length - 1 && this.setData({currentIndex: idx + 1});
  },
  settingPageChange({detail}){
    this.setData({
      currentIndex: detail.current
    })
  },
  completeSetting(){
    wx.navigateBack();
  }
})