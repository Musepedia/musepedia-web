// components/exhibit-card/index.js
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
    showDivider: false,
    showActionBar: false
  },
  data: {

  },
  methods: {
  }
})
