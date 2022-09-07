// index.js
import BasePage from '../helpers/base-page'

const app = getApp()

BasePage({
  options: {
    addGlobalClass: true
  },
  data: {
  },
  onShow(){
  },
  scanCode(){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: [],
      success: (result) => {
        console.log(result);
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})
