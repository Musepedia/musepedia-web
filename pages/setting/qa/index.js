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
  },
  showTooltip(){
    wx.showModal({
      title: '提示',
      content: `该模式可能使用包括但不限于GPT在内的大规模语言模型生成回答，尽管我们已经尽力确保其准确性，但仍然可能存在错误或偏差。
      我们会记录您发送的问题和生成的回答，这些数据将被用于后续的训练，以此来提高模型的性能和表现。`,
      showCancel: false
    })
  }
})