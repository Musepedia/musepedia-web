// pages/signin/index.js
Page({
  data: {
    result: {
      name: '钱学森研学活动2022-4-1',
      icon: 'success',
      message: '签到成功，感谢您的参与！'
    }
  },
  onLoad: function (options) {
    console.log(options.eventId);
  },
})