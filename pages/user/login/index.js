import {sendSMS} from '../../../api/sms'

Page({
  data: {
    phoneNumber: '',
    validPhoneNumber: false,
    smsInterval: 0,
    sendingSMS: false,
    sms: '',
    showInitProfilePopup: false,
    completeProfile: false
  },
  onLoad: function (options) {
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onPhoneInput({detail}){
    const phonePattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g;
    const v = detail.value.replace(/\D/g, '')
    this.setData({
      validPhoneNumber: phonePattern.test(v)
    })
    return v
  },
  onSMSInput({detail}){
    const v = detail.value.replace(/\D/g, '')
    return v;
  },
  onSendSMSClick(){
    this.setData({
      sendingSMS: true
    });

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
    }).finally(() => this.setData({
      sendingSMS: false
    }))
  },
  login(){
    getApp().userLoginWx({
      phoneNumber: this.data.phoneNumber,
      sms: this.data.sms,
      vc: this.data.vc
    }).then(data => {
      if(!wx.getStorageSync('initProfile')){
        wx.setStorageSync('initProfile', true);
        // 完善个人资料 
        this.setData({
          showInitProfilePopup: true
        })
      }
    }).catch(ignore => {})
  },
  goProfile(){
    wx.navigateTo({
      url: '/pages/setting/profile/index',
    });
    this.setData({
      completeProfile: true
    })
  },
  closeInitProfilePopup(){
    // 初次登陆设置偏好 
    if(!wx.getStorageSync('initPreference')){
      wx.setStorageSync('initPreference', true);
      wx.redirectTo({
        url: '/pages/setting/preference/index',
      })
    } else {
      wx.navigateBack()
    }
  }
})