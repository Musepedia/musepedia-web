// index.js
import BasePage from '../helpers/base-page'
import {getCarousel} from '../../api/carousel'

const app = getApp()

BasePage({
  options: {
    addGlobalClass: true
  },
  data: {
    currentCarouselIndex: 0,
    carousels: [],
    showPopup: false,
    popupItem: {},
  },
  onShow(){
    getCarousel().then(data => {
      this.setData({
        carousels: data
      })
    }).catch(ignore => {})
  },
  showPopup(popupItem){
    this.setData({
      popupItem: popupItem,
      showPopup: true
    })
  },
  closePopup(){
    this.setData({
      showPopup: false
    })
  },
  onCarouselTap({currentTarget = {}}){
    const index = currentTarget.dataset.index;
    const carousel = this.data.carousels[index];
    if(carousel.type === 'link'){
      wx.navigateTo({
        url: `/pages/webpage/index?url=${this.data.carousels[index].link}`,
      })
    } else if(carousel.type === 'display'){
      this.showPopup({
        title: carousel.title,
        content: carousel.detail,
        img: carousel.img
      });
    }
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
