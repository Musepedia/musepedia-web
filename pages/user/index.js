import { userLogin } from '../../api/user';
import {wxLogin} from '../../utils/util'

const app = getApp();
const globalUserInfo = app.globalData.userInfo;
const globalAppInfo = app.globalData.appInfo;

Page({
  data: {
    isLogin: globalUserInfo.isLogin,
    username: globalUserInfo.username,
    avatar: globalUserInfo.avatar,
    appVersion: globalAppInfo.version
  },
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2,
      });
    }
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onShareAppMessage: function () {

  },
  handleLoginTap(e){
    // wx.clearStorage();
    wxLogin().then(res => {
      console.log("login+profile",res);
      // return userLogin({
      //   code: res[0].code,
      //   encryptedData: res[1].encryptedData,
      //   iv: res[1].iv,
      //   avatar: res[1].userInfo.avatarUrl,
      //   nickname: res[1].userInfo.nickName
      // });
    }).then(data => {

    })
    return;
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