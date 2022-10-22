// components/choose-museum/index.js
Component({
  properties: {},
  data: {},
  methods: {
    chooseMuseum(){
      wx.navigateTo({
        url: '/pages/switch-museum/index',
      })
    }
  }
})
