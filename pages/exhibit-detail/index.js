// pages/exhibit-detail/index.js
Page({
  data: {
    exhibit: {
      
    },
    questions: [
      {
        question: '银杏喜欢吃兔子吗'
      },
      {
        question: '经常遭到图波列夫-160超音速变后掠翼远程战略轰炸机的骚扰导致无法睡眠怎么办'
      },
      {
        question: '鸢尾花会滑雪吗'
      },
      {
        question: '绣球花可以用于防空吗'
      }
    ],
    // popup question
    showPopup: false,
    popupQuestion: {}
  },
  onLoad: function (options) {},
  onReady: function () {}, 
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onQuestionCardTap(e){
    const question = e.target.dataset.question;
    this.setData({
      showPopup: true,
      popupQuestion: {
        question: question.question,
        answer: '使用LCL浇花会导致全球民用铀原料价格上升，从而导致在寝室制备民用核武器难度加大，这对您的校园军备竞赛十分不利',
        src: 'https://bing.wilii.cn/OneDrive/bingimages/2022/05/23//RedBellied_ZH-CN8667089924_1920x1080.jpg'
      }
    })
  },
  closePopup(){
    this.setData({
      showPopup: false
    });
  }
})