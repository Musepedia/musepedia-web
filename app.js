import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog';

App({
  onLaunch() {
    this.checkiPhoneX();
    this.initShortcut();
    this.getUserInfo();
    this.checkForUpdate();
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
  },
  checkForUpdate(){
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  }
})
