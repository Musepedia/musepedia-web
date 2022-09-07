import BasePage from '../helpers/base-page'
import {getRecommendQuestion} from '../../api/explore'

BasePage({
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
    const popup = this.selectComponent('#popup-question-card');
    if(popup){
      const action = popup.selectComponent('.question-card-action');
      action && action.setData({
        showPopover: false
      })
    }
    this.setData({
      showPopup: false
    });
  }
})