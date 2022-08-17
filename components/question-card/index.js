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
    }
  },
  data: {

  },
  methods: {
    sendFeedback({detail}){
      questionFeedback({
        questionId: this.data.questionId,
        feedback: detail.feedback
      }).then(() => {
        wx.Toast.success({
          message: '已提交反馈'
        });
      })
    }
  }
})
