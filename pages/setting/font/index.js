// pages/setting/font/index.js
import BasePage from '../../helpers/base-page'
import {CommonMessage} from '../../../utils/message-builder'

const app = getApp();

const v2f = ['12px','14px','16px','18px','20px','22px'];
const f2v = Object.fromEntries(v2f.map((e,i) => [e,i]));
const testMessages = [
  CommonMessage('预览提问字体', app.globalData.userInfo.avatarUrl, true),
  CommonMessage('如果选择"微信字体大小一致"，则小程序字体会跟随微信设置中的字体变化', '/assets/icons/M2.png', false),
  CommonMessage('否则可以拖动下方的滑块来调整字体大小', '/assets/icons/M2.png', false),
]

BasePage({
  data: {
    useWechatFontSize: true,
    fontSizeValue: 2,
    testMessages: testMessages
  },
  onShow(){
    const fontSize = wx.getStorageSync('globalFontSize');
    this.setData({
      useWechatFontSize: fontSize === 'system',
      fontSizeValue: fontSize === 'system' ? 2 : f2v[fontSize]
    })
  },
  setFontSize(size){
    this.setData({ __globalFontSize: size})
    wx.setStorageSync('globalFontSize', size);
  },
  toggleWechatFontSize({detail}){
    this.setData({ useWechatFontSize: detail });
    this.setFontSize(detail ? 'system' : v2f[this.data.fontSizeValue])
  },
  changeFontSize({detail}) {
    this.setData({ fontSizeValue: detail.value });
    this.setFontSize(v2f[detail.value]);
  }
})