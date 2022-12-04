// components/explore-card/index.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    images: {
      type: Array,
      value: []
    },
    imageHeight: {
      type: String,
      value: '84px'
    },
    detail: {
      type: String,
      value: ''
    },
    imageMode: {
      type: String,
      value: 'aspectFill'
    },
    disablePreview: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    startPreview({currentTarget}){
      if(this.properties.disablePreview){
        return
      }
      const current = currentTarget.dataset.src;
      wx.previewImage({
        urls: this.properties.images,
        current: current
      })
    }
  }
})
