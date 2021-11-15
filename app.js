import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog';

App({
  onLaunch() {
    this.checkiPhoneX();
    this.initShortcut();
    this.getUserInfo();
  },
  globalData: {
    userInfo: {
      username: '',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      isLogin: false
    },
    isiPhoneX: false
  },
  checkiPhoneX: function() {
    wx.getSystemInfo({
      success: res => {
        if (res.model.search('iPhone X') != -1) {
          this.globalData.isiPhoneX = true
        }
      }
    })
  },
  initShortcut(){
    wx.Toast = Toast;
    wx.Dialog = Dialog;
  },
  getUserInfo(){
    const userInfo = wx.getStorageSync('userInfo');
    userInfo && (this.globalData.userInfo = userInfo);
  }
})
