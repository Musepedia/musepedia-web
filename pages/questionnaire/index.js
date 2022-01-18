import {getRandomExhibits} from '../../api/exhibit'
import {updateUserPreference} from '../../api/setting'

// pages/preference/index.js
Page({
  data: {
    preferenceSettings: [[]],
    // note: multiple page checkbox currently is not support
    currentPreferences: {},
    currentIndex: 0, // page index
    hideSkipButton: false
  },
  onLoad: function (options) {
    this.setData({
      hideSkipButton: !!options.hideSkipButton
    })
  },
  onReady: function () {},
  onShow: function () {
    getRandomExhibits().then(data => {
      this.setData({
        preferenceSettings: [data]
      })
    }).catch(ignore => {});
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  previousPage(){
    this.changePage(this.data.currentIndex - 1);
  },
  nextPage(){
    this.changePage(this.data.currentIndex + 1);
  },
  settingPageChange({detail}){
    this.changePage(detail.current);
  },
  changePage(index){
    if(index >= 0 && index < this.data.preferenceSettings.length){
      this.setData({
        currentIndex: index
      })
    }
  },
  completeSetting(){
    const selectedHallIds = Object.entries(this.data.currentPreferences).filter(e => e[1]).map(e => e[0]);
    updateUserPreference(selectedHallIds).then(data => {
      wx.Toast.success('设置已保存');
      setTimeout(() => wx.navigateBack(), 700);
    }).catch(ignore => {});
  },
  settingItemTap(e){
    const data = e.currentTarget.dataset;
    this.data.currentPreferences[data.name] = !this.data.currentPreferences[data.name];
    this.setData({
      currentPreferences: this.data.currentPreferences
    })
  }
})