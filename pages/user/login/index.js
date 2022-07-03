import {sendSMS} from '../../../api/sms'

Page({
  data: {
    phoneNumber: '',
    smsInterval: 0,
    sms: '',
  },
  onLoad: function (options) {
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onPhoneInput({detail}){
    return detail.value.replace(/\D/g, '')
  },
  onSMSInput({detail}){
    const v = detail.value.replace(/\D/g, '')
    return v;
  },
  onSendSMSClick(){
    sendSMS({
      phone: this.data.phoneNumber
    }).then(data => {
      this.setData({
        vc: data,
        smsInterval: 60
      });
      setInterval(() => {
        this.setData({
          smsInterval: this.data.smsInterval - 1
        })
      }, 1000);
    })
  },
  login(){
    getApp().userLoginWx({
      phoneNumber: this.data.phoneNumber,
      sms: this.data.sms,
      vc: this.data.vc
    }).then(data => {
      // 初次登陆设置偏好 
      if(!wx.getStorageSync('initPreference')){
        wx.setStorageSync('initPreference', true);
        wx.redirectTo({
          url: '/pages/setting/preference/index',
        })
      } else {
        wx.navigateBack()
      }
    }).catch(ignore => {})
  }
})