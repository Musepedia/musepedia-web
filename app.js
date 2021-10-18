App({
  onLaunch() {
    this.checkiPhoneX();
  },
  globalData: {
    userInfo: null,
    isiPhoneX: false
  },
  checkiPhoneX: function() {
    wx.getSystemInfo({
      success: res => {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') != -1) {
          this.globalData.isiPhoneX = true
        }
        // 或者根据 screenHeight 进行判断
        // if (res.screenHeight == 812) {
        //   self.globalData.isIPX = true
        // }
      }
    })
  },
})
