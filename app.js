import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
import {getUserInfo, userLogin} from './api/user'

App({
  onLaunch() {
    this.checkUpdate();
    this.checkiPhoneX();
    this.initShortcut();
    this.getUserInfo();
  },
  globalData: {
    userInfo: {
      nickname: '',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      isLogin: false
    },
    isiPhoneX: false,
    appInfo: {
      version: 'Beta 0.3.4'
    }
  },
  checkiPhoneX: function() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.isiPhoneX = res.model.search('iPhone X') != -1;
      }
    })
  },
  initShortcut(){
    wx.Toast = Toast;
    wx.Dialog = Dialog;
  },
  /**
   * @param {*} data data包含nickname, avatarUrl
   */
  setGlobalUserInfo(data){
    this.globalData.userInfo = {
      nickname: data.nickname,
      avatar: data.avatarUrl,
      isLogin: true
    };
  },
  getUserInfo(){
    const token = wx.getStorageSync('token');
    const registered = wx.getStorageSync('registered');
    if(!token || !registered){
      return;
    }
    getUserInfo().then(data => {
      if(data && data.nickname){
        this.setGlobalUserInfo(data);
      } else {
        // token过期，重新获取code并登录
        wx.login({
          success: (res) => {
            console.log(res);
            userLogin({
              code: res.code
            }).then(data => this.setGlobalUserInfo(data))
            .catch(err => console.log(err))
          }
        })
      }
    }).catch(err => {
      console.log("failed to getUserInfo()");
    })
  },
  checkUpdate() {
    if (!wx.canIUse('getUpdateManager')) {
      return;
    }
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      console.log('onCheckForUpdate====', res)
      // 请求完新版本信息的回调
      if (!res.hasUpdate) {
        return;
      }
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            console.log('success====', res)
            // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            res.confirm && updateManager.applyUpdate();
          }
        })
      })
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
        wx.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
        });
      })
    })
  }
})
