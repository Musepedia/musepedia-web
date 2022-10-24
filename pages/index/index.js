// index.js
import BasePage from '../helpers/base-page'

const app = getApp()

BasePage({
  options: {
    addGlobalClass: true
  },
  data: {
    currentCarouselIndex: 0,
    carousels: [
      {
        src: '//pt.musepedia.cn/t01164c3f691c15ebbf.jpg'
      },
      {
        src: '//pt.musepedia.cn/826eb2b2a42c55f7.jpg'
      },
      {
        src: '//pt.musepedia.cn/100sh.jpg'
      }
    ]
  },
  onShow(){
  },
  carouselIndexChange({detail}){
    this.setData({
      currentCarouselIndex: detail.current
    })
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
