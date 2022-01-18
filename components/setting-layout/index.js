// components/setting-layout/index.js
Component({
  options: {
    multipleSlots: true 
  },
  properties: {
    settingSetLength: {
      type: Number,
      value: 1
    }
  },
  data: {

  },
  methods: {
    completeSetting(){
      this.triggerEvent('complete');
    }
  }
})
