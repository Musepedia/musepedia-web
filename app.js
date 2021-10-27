import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog';

App({
  onLaunch() {
    this.checkiPhoneX();
    this.initShortcut();
  },
  globalData: {
    userInfo: {},
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
  /**
   * 初始化消息提示，对话框快捷调用
   */
  initShortcut(){
    wx.Toast = Toast;
    wx.Dialog = Dialog;
  },
  getUserInfo(){
    
  }
})
