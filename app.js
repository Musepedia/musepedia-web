import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog'
import EventEmitter2 from 'eventemitter2';
import {getUserInfo, userLogin, updateUserProfile} from './api/user'
import {wxLoginWithBackend} from './utils/util'
import {queryMuseumWithDistance, getCurrentMuseum} from './api/museum'

const defaultAvatarUrl = '/assets/icons/default-avatar.svg';

App({
  onLaunch() {
    this.initEventEmitter();
    this.checkUpdate();
    this.checkiPhoneX();
    this.initShortcut();
    this.initStorage();
    this.getUserInfo();
    this.setDefaultMuseum();
  },
  globalData: {
    defaultAvatarUrl: defaultAvatarUrl,
    userInfo: {
      nickname: '',
      avatarUrl: defaultAvatarUrl,
      isLogin: false
    },
    userLocation: null, // 用户经纬度坐标
    currentMuseumInfo: null,
    isiPhoneX: false,
    appInfo: {
      version: 'Beta 0.3.7'
    }
  },
  initEventEmitter(){
    const emitter = new EventEmitter2({
      wildcard: false,
      delimiter: '.', 
      newListener: false, 
      removeListener: false, 
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false
    });
    emitter.emit('test', 'hello')
    this.emitter = emitter;
    this.$on = emitter.on.bind(emitter);
    this.$emit = emitter.emit.bind(emitter);
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
    if(wx.getStorageSync('useGpt') === ''){
      wx.setStorageSync('useGpt', true)
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
    const fuzzyLocation = new Promise((resolve, reject) => {
      wx.getFuzzyLocation({
        type: 'gcj02',
        success: res => {
          this.globalData.userLocation = [res.longitude, res.latitude];
          resolve([res.longitude, res.latitude])
        },
        fail(err){
          console.log("获取地理位置信息失败",err);
        }
      })
    })
    // const location = wx.getFuzzyLocation({type: 'gcj02'}).then(res => {
    //   this.globalData.userLocation = [res.longitude, res.latitude];
    //   return Promise.resolve([res.longitude, res.latitude]);
    // }) 
    return this.globalData.userLocation === null 
      ? fuzzyLocation 
      : Promise.resolve(this.globalData.userLocation)
  },
  setDefaultMuseum(){
    if(wx.getStorageSync('currentMuseumId')){
      return;
    }
    // this.getUserLocation()
    //   .then(res => queryMuseumWithDistance({}, res))
    //   .then(data => {
    //     data.sort((a,b) => a.distance - b.distance);
    //     wx.setStorageSync('currentMuseumId', data[0].id);
    //   }).catch(ignore => {})
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
    if (!data.phoneNumber){
      const msg = '手机号不能为空';
      wx.Toast.fail(msg)
      return Promise.reject(msg)
    }
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
      this.globalData.doingLogin = false;
      this.$emit('user.login.finish', data);
    } ;
    // 请求后端，先标志正在请求
    this.globalData.doingLogin = true;
    this.$emit('user.login.begin', true);

    getUserInfo().then(data => {
      if(data){
        loginSuccess(data);
      } else {
        // token过期，重新获取code并登录
        wx.login({
          success: (res) => {
            userLogin({
              code: res.code
            }).then(loginSuccess)
              .catch(err => {
                this.globalData.doingLogin = false;
                this.$emit('user.login.finish', null)
              })
          }
        })
      }
    }).catch(err => {
      console.log("getUserInfo请求服务器失败", err);
      this.globalData.doingLogin = false;
      this.$emit('user.login.finish', null);
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
