import {getRecommendQuestion} from '../../api/explore'

Page({
  data: {
    exhibit: {},
    questions: [],
    // popup question
    showPopup: false,
    popupQuestion: {}
  },
  onLoad: function (options) {
    const ch = this.getOpenerEventChannel();
    ch.on('exhibitData', data => {
      this.setData({
        exhibit: data
      });
      getRecommendQuestion({
        count: 4,
        exhibitId: data.id
      }).then(data => {
        data.forEach(e => {
          const answer = e.answerText;
          if(e.answerType === 3 || answer.startsWith('https://') || answer.startsWith('http://')){
            e.answerType = 2;
          }
        })
        this.setData({
          questions: data
        })
      }).catch(ignore => {})
    })
  },
  onReady: function () {}, 
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onQuestionCardTap(e){
    const question = e.target.dataset.question;
    this.setData({
      showPopup: true,
      popupQuestion: question
    })
  },
  closePopup(){
    this.setData({
      showPopup: false
    });
  }
})