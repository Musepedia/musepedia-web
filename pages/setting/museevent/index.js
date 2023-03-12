// pages/setting/museevent/index.js
import {listEnrollment} from '../../../api/museevent'
import {BasePage} from '../../helpers/base-page'

BasePage({
  data: {
    enrollmentList: []
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {
    listEnrollment().then(data => {
      this.setData({
        enrollmentList: data
      })
    }).catch(ignore => {})
  },
  onHide: function () {},
  onUnload: function () {},
  toEventDetail(e){
    const eid = e.currentTarget.dataset.eid
    wx.navigateTo({
      url: '/pages/museevent/index?id=' + eid,
    })
  }
})