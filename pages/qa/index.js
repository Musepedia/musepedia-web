Page({
  data: {
    messages: []
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
  onMessage({detail}){
    let {text, clear} = detail;
    let valid = text && text.length;
    if(!valid){
      return;
    }
    clear();
    this.setData({
      messages: this.data.messages.concat({
        avatar: 'http://sornk.cn/wp-content/uploads/2020/11/cropped-IMG_5289.jpg',
        text: text,
        right: true,
        type: 'common'
      })
    });
    // do request
    setTimeout(() => {
      this.setData({
        messages: this.data.messages.concat({
          avatar: 'https://www.neptu.cn/uploads/img/1623154552723-84596340_p0_master1200.jpg',
          text: text.substr(0, text.length - 1) + '!',
          right: false,
          type: 'common'
        })
      });
    }, 1000)
  }
})