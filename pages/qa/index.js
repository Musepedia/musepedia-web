Page({
  data: {
    messages: [],
  },
  onLoad: function (options) {
    this.messageComponent || (this.messageComponent = this.selectComponent('#qa-message-component'));
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
    const {text, clear} = detail;
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
    this.messageComponent.scrollToBottom();
    // do request
    setTimeout(() => {
      const recommends = detail.showRecommend ? ['银杏喜欢玩原神吗', '银杏是沙拉吗'] : [];
      this.setData({
        messages: this.data.messages.concat({
          avatar: 'https://www.neptu.cn/uploads/img/1623154552723-84596340_p0_master1200.jpg',
          text: text.substr(0, text.length - 1) + '!',
          right: false,
          fullWidth: true,
          type: 'recommend',
          recommends: recommends
        })
      });
      this.messageComponent.scrollToBottom();
    }, 1000)
  },
  onRefresh({detail}){
    const done = detail.done;
    const oldMsg = {
      avatar: 'https://www.neptu.cn/uploads/img/1623154552723-84596340_p0_master1200.jpg',
      text: 'Old meSSagE',
      right: false,
      fullWidth: true,
      type: 'common'
    };
    setTimeout(() => {
      this.setData({
        messages: [oldMsg].concat(this.data.messages)
      });
      done();
    }, 1000)
  }
})