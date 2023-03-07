// pages/museevent/index.js
import {validatePhone} from '../../utils/util'
import {getMuseEvent} from '../../api/museevent'
import {BasePage} from '../helpers/base-page'
import {requestPayment} from '../../utils/payment'

BasePage({
  data: {
    event: {
      img: '',
      name: '',
      description: '',
      link: '',
      startTime: 0,
      endTime: 0,
    },
    phone: '',
  },
  onLoad(options){
    getMuseEvent(options.id).then(data => {
      this.setData({
        event: data
      })
    }).catch(() => {
      wx.Toast.fail('获取活动信息失败')
    })
  },
  onReady: function () {},
  onShow: function () {

  },
  onHide: function () {},
  onUnload: function () {},
  enrollInEvent(){
    requestPayment()
  }
})