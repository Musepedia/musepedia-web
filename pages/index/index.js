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
          detail: `坐落在上海交通大学徐汇校区的钱学森图书馆，于2011年12月11日钱学森诞辰100周年之际建成对外开放。图书馆的建筑外形简洁、庄重，远看恰似戈壁滩中的风蚀岩，面向华山路的红色外墙上隐约看到钱老微笑的面庞，眼光向前，似乎正凝视着玻璃幕墙中显现的“两弹结合”导弹，体现了“大地情怀、石破天惊”的设计理念。图书馆总用地面积9300平方米，总建筑面积8188平方米，地下一层，地上三层，陈展面积约3000余平方米。馆内基本展览分为中国航天事业奠基人、科学技术前沿的开拓者、人民科学家风范和战略科学家的成功之道四个部分。馆藏钱学森同志文献、手稿和书籍61000余份，珍贵图片300余张，实物近700件。馆内设有多功能厅、专题展厅、学术交流厅等文化设施。
钱学森图书馆是全国爱国主义教育示范基地、全国科普教育基地、上海市爱国主义教育基地、上海市科普教育基地、上海市国防教育基地，并将建设成为钱学森文献实物收藏管理中心、学术思想研究中心、科学成就和崇高精神的宣传展示中心，以此充分发挥其对广大干部群众进行爱国主义教育，进一步宣传弘扬民族精神和科学精神的作用。`,
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
