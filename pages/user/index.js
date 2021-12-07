import { userLogin } from '../../api/user';
import {wxLogin} from '../../utils/util'

const app = getApp();
const globalAppInfo = app.globalData.appInfo;

Page({
  data: {
    isLogin: false,
    nickname: '',
    avatar: '',
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
    };
    const globalUserInfo = app.globalData.userInfo; 
    this.setData({
      isLogin: globalUserInfo.isLogin,
      nickname: globalUserInfo.nickname,
      avatar: globalUserInfo.avatar,
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onShareAppMessage: function () {

  },
  handleLoginTap(e){
    wxLogin().then(res => {
      return userLogin({
        code: res[0].code,
        encryptedData: res[1].encryptedData,
        iv: res[1].iv,
        avatarUrl: res[1].userInfo.avatarUrl,
        nickname: res[1].userInfo.nickName
      });
    }).then(data => {
      wx.Toast.success('登陆成功')
      app.setGlobalUserInfo(data);
      this.setData({
        isLogin: globalUserInfo.isLogin,
        nickname: globalUserInfo.nickname,
        avatar: globalUserInfo.avatar,
      })
    })
  }
})