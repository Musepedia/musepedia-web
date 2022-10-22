// components/loading-spin/index.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    laading: {
      type: Boolean,
      value: false
    },
    loadingText: {
      type: String,
      value: ''
    },
    loadingFinishText: {
      type: String,
      value: '已经没有更多了...'
    }
  },
  data: {},
  methods: { }
})
