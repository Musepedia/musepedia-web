// pages/preference/index.js
import {getUserPreference,updateUserPreference} from '../../../api/setting'
import {getExhibitionHallByMuseumId} from '../../../api/exhibition-hall'

Page({
  data: {
    result: [],
    exhibitionHalls: [],
    exhibitionHallChecked: {}
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {
    Promise.all([
      getUserPreference(), 
      getExhibitionHallByMuseumId()
    ]).then(data => {
      const checked = {};
      data[0] = data[0].map(e => e+"");
      data[0].forEach(e => (checked[e] = true));
      this.setData({
        exhibitionHallChecked: checked,
        result: data[0],
        exhibitionHalls: data[1]
      })
    }).catch(ignore => {})
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  completeSetting(){
    updateUserPreference(this.data.result).then(data => {
      wx.Toast.success('设置已保存');
      setTimeout(() => wx.navigateBack(), 700);
    }).catch(ignore => {});
  },
  onSettingChange({detail}){
    const checked = {};
    detail.forEach(e => (checked[e] = true));
    this.setData({
      result: detail,
      exhibitionHallChecked: checked
    })
  },
  navigateToQuestionnaire(){
    wx.navigateTo({
      url: '/pages/questionnaire/index',
    })
  }
})