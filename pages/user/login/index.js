import BasePage from '../../helpers/base-page'
import {sendSMS} from '../../../api/sms'
import {validatePhone} from '../../../utils/util'

BasePage({
  data: {
    phoneNumber: '',
    validPhoneNumber: false,
    smsInterval: 0,
    sendingSMS: false,
    sms: '',
    showInitProfilePopup: false,
    completeProfile: false,
    agreed: false
  },
  onLoad: function (options) {
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onPhoneInput({detail}){
    const v = detail.value.replace(/\D/g, '')
    this.setData({
      validPhoneNumber: validatePhone(v)
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
    if(!this.data.agreed){
      wx.Toast.fail('请先阅读并同意《用户协议及隐私政策》')
      return;
    }
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
      } else {
        wx.navigateBack();
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
  toAgreement(){
    wx.navigateTo({
      url: '/pages/webpage/index?url=https://musepedia.cn/term.html',
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
  },
  onAgreementChange({detail}){
    const values = detail.value;
    this.setData({
      agreed: values.length > 0
    })
  }
})