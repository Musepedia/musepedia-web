// components/explore-card/index.js
Component({
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
      value: [
        'https://bing.wilii.cn/OneDrive/bingimages/2011/05/26/NigerSalt_ZH-CN466925723.jpg',
        'https://bing.wilii.cn/OneDrive/bingimages/2010/05/26/BlueHole_ZH-CN663031748.jpg',
        'https://bing.wilii.cn/OneDrive/bingimages/2020/09/05/BeaverDam_ZH-CN6855160492_640x480.jpg'
      ]
    },
    imageHeight: {
      type: String,
      value: '84px'
    },
    detail: {
      type: String,
      value: ''
    }
  },
  data: {

  },
  methods: {

  }
})
