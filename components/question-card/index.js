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
  }
})
