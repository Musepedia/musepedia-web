import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
import {getUserInfo, userLogin, updateUserProfile} from './api/user'
import {wxLoginWithBackend} from './utils/util'
import {queryMuseumWithDistance, getCurrentMuseum} from './api/museum'

App({
  onLaunch() {
    this.checkUpdate();
    this.checkiPhoneX();
    this.initShortcut();
    this.initStorage();
    this.getUserInfo();
    this.setDefaultMuseum();
  },
  globalData: {
    userInfo: {
      nickname: '',
      avatarUrl: '/assets/icons/default-avatar.svg',
      isLogin: false
    },
    userLocation: null, // 用户经纬度坐标
    currentMuseumInfo: null,
    isiPhoneX: false,
    appInfo: {
      version: 'Beta 0.3.7'
    }
  },
  resetUserInfo(){
    this.globalData.userInfo = {
      nickname: '',
      avatarUrl: '/assets/icons/default-avatar.svg',
      isLogin: false
    }
  },
  initStorage(){
    // 添加默认本地设置
    if(!wx.getStorageSync('globalFontSize')){
      wx.setStorageSync('globalFontSize', 'system');
    }
  },
  checkiPhoneX() {
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
  getCurrentMuseumId(){
    return wx.getStorageSync('currentMuseumId') || null;
  },
  setCurrentMuseumId(id){
    if(id && id !== wx.getStorageSync('currentMuseumId')){
      wx.setStorageSync('currentMuseumId', id)
      this.globalData.currentMuseumInfo = null;
    }
  },
  getCurrentMuseumInfo(){
    return this.globalData.currentMuseumInfo === null 
          ? getCurrentMuseum().then(data => this.globalData.currentMuseumInfo = data)
          : Promise.resolve(this.globalData.currentMuseumInfo);
  },
  getUserLocation(){
    return this.globalData.userLocation === null 
      ? wx.getLocation({type: 'gcj02'}).then(res => {
        this.globalData.userLocation = [res.longitude, res.latitude];
        return Promise.resolve([res.longitude, res.latitude]);
      }) 
      : Promise.resolve(this.globalData.userLocation)
  },
  setDefaultMuseum(){
    if(wx.getStorageSync('currentMuseumId')){
      return;
    }
    this.getUserLocation()
      .then(res => queryMuseumWithDistance({}, res))
      .then(data => {
        data.sort((a,b) => a.distance - b.distance);
        wx.setStorageSync('currentMuseumId', data[0].id);
      }).catch(ignore => {})
  },
  /**
   * @param {*} data data包含nickname, avatarUrl
   */
  setGlobalUserInfo(data){
    this.globalData.userInfo = data;
  },
  checkLogin(forceLogin = false){
    if(forceLogin && !this.globalData.userInfo.isLogin){
      this.globalData.showLoginHint = true;
      wx.switchTab({
        url: '/pages/user/index',
      })
    }
    return this.globalData.userInfo.isLogin;
  },
  userLoginWx(data){
    return wxLoginWithBackend(data).then(data => {
      wx.Toast.success('登录成功');
      data.isLogin = true;
      this.setGlobalUserInfo(data);
      // 记录用户是否曾经授权登录过
      // 如果授权过会在小程序启动时尝试获取用户信息
      wx.setStorageSync('registered', true);

      return data;
    })
  },
  updateUserInfo(data){
    return updateUserProfile(data).then(() => {
      Object.assign(this.globalData.userInfo, data);
    });
  },
  getUserInfo(){
    const token = wx.getStorageSync('token');
    const registered = wx.getStorageSync('registered');
    if(!token || !registered){
      return;
    }
    const loginSuccess = data => {
      data.isLogin = true;
      this.setGlobalUserInfo(data);
    } ;
    getUserInfo().then(data => {
      if(data){
        loginSuccess(data);
      } else {
        // token过期，重新获取code并登录
        wx.login({
          success: (res) => {
            userLogin({
              code: res.code
            }).then(loginSuccess).catch(err => console.log(err))
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
