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
      data = data.filter(d => d.title !== '欢迎使用Musepedia博物馆导览系统')
      if (data.length < 3){
        data.push({
          "title":"团队介绍",
          "detail":"",
          "img":"https://static.musepedia.cn/2023/team.jpeg",
          "type":"link",
          "link":"https://mp.weixin.qq.com/s/r_4Cnfx3mvntWoYuKGSFyw"
        })
      }
      if (data.length < 3) {
        data.push({
          title: "钱学森图书馆", 
          detail: `钱学森是享誉海内外的杰出科学家和我国航天事业的奠基人，他的杰出贡献、感人事迹和崇高品格，是我们国家和民族宝贵的精神财富。钱学森图书馆由国家投资兴建，于2011年12月11日钱学森诞辰百年之际在上海交通大学徐汇校区建成开馆。
          这是国内又一座科学家纪念馆，先后获得了全国爱国主义教育示范基地、全国科普教育基地、上海市爱国主义教育基地、上海市科普教育基地、上海市国防教育基地等称号。
          这里收藏保存着6万2千余件钱学森珍贵文献、手稿、照片和实物，布置陈列着3000余平米的“人民科学家钱学森”主题展览。
          这是面向社会弘扬钱学森精神、宣传爱国主义和科学精神的文化育人平台。开馆至今，共累计接待观众近190万人次，推出各类原创展览近20个，全国巡回展览50余场，主题教育活动1000余场。
          钱学森的科学成就、杰出贡献和崇高风范，正以鲜活的形象逐步走近和感染着公众。钱学森图书馆将以钱学森的爱国主义和科学精神为核心，以专业化、学术型、国际化为发展战略，深化博物馆内涵建设，创造性地弘扬社会主义核心价值观，打造一流的文化育人基地。`,
          img: "https://static.musepedia.cn/2023/qxs.png",
          type: "display",
          link: null
        })
      }
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
