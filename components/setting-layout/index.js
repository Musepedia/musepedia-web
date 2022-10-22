// components/setting-layout/index.js
Component({
  options: {
    multipleSlots: true 
  },
  properties: {
    settingSetLength: {
      type: Number,
      value: 1
    },
    completeHint: {
      type: String,
      value: '完成'
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
