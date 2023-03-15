import {questionFeedback} from '../../api/feedback'

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    src: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'aspectFill'
    },
    questionId: {
      type: Number
    },
    qaType: {
      type: Number
    },
    question: {
      type: String,
      value: ''
    },
    answer: {
      type: String,
      value: ''
    },
    showDivider: {
      type: Boolean,
      value: false
    },
    showDividerDown: {
      type: Boolean,
      value: false
    },
    showActionBar: {
      type: Boolean,
      value: false
    },
    exhibitId: {
      type: Number,
      value: 0
    }
  },
  data: {

  },
  methods: {
    sendFeedback({detail}){
      questionFeedback({
        questionId: this.data.questionId,
        qaType: this.data.qaType,
        feedback: detail.feedback
      }).then(() => {
        wx.Toast.success({
          message: '已提交反馈'
        });
      })
    },
    naviToDetail(){
      const eid = this.data.exhibitId
      if(eid){
        wx.navigateTo({
          url: `/pages/exhibit-detail/index?exhibitId=${eid}`,
        })
      }
    },
    startPreview({currentTarget}){
      wx.previewImage({
        urls: [currentTarget.dataset.src],
      })
    }
  }
})
