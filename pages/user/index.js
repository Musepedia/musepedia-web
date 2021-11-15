const app = getApp();
const globalUserInfo = app.globalData.userInfo;

Page({
  data: {
    isLogin: globalUserInfo.isLogin,
    username: globalUserInfo.username,
    avatar: globalUserInfo.avatar,
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
  onShareAppMessage: function () {

  },
  handleLoginTap(e){
    wx.clearStorage();
    
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: res => {
        console.log(res);
        const wxUserInfo = JSON.parse(res.rawData);
        // 设置信息
        const userInfo = {
          isLogin: true,
          username: wxUserInfo.nickName,
          avatar: wxUserInfo.avatarUrl
        }
        app.globalData.userInfo = userInfo;
        this.setData(userInfo);
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        })
        wx.Toast.success('登录成功');
      },
    });
  }
})