// components/router-link/index.js
Component({
  properties: {
    to: String,
    mode: Number
  },
  data: {
    
  },
  methods: {
    navigateTo(){
      wx.navigateTo({
        url: this.data.to,
      })
    }
  }
})
