// components/message-component/common-message/index.js
Component({
  options: {
    styleIsolation: false
  },
  properties: {
    showArrow: {
      type: Boolean,
      value: true
    },
    showMore: {
      type: Boolean,
      value: false
    },
    right: {
      type: Boolean,
      value: false
    },
    fullWidth: {
      type: Boolean,
      value: false
    },
    transparent: {
      type: Boolean,
      value: false
    },
    textCenter: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: ''
    },
    customClass: {
      type: String,
      value: ''
    }
  },
  data: {

  },
  methods: {
    onMoreTap(){
      this.triggerEvent('moretap', {}, {bubbles: true, composed:true})
    }
  }
})
