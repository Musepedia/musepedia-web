// pages/user/login/index.js
Page({
  data: {
    phone: '',
    sms: '',
    smsInterval: 0,
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onSendSMSClick(){
    this.setData({
      smsInterval: 60
    });
    setInterval(() => {
      this.setData({
        smsInterval: this.data.smsInterval - 1
      })
    }, 1000);
  }
})