// components/exhibit-action/index.js
Component({
  properties: {
    iconSize: {
      type: String,
      value: '20px'
    },
    showInfo: {
      type: Boolean,
      value: false
    }
  },
  data: {
    likeIcon: 'like-o',
    likeColor: '',
    showPopover: false
  },
  methods: {
    toggleLikeStatus(){
      if(this.data.likeIcon === 'like-o'){
        this.setData({
          likeIcon: 'like',
          likeColor: 'var(--primary-orange)'
        })
      } else {
        this.setData({
          likeIcon: 'like-o',
          likeColor: ''
        })
      }
    },
    onActionTap(e){
      const action = e.currentTarget.dataset.action;
      if(action === 'like'){
        this.toggleLikeStatus();
      } else if(action === 'more'){
        // this.setData({
        //   showPopover: true
        // })
      }
      this.triggerEvent(`exhibitaction${action}`, {}, {bubbles: true, composed:true})
    },
    onChange(e){
      this.setData({
        showPopover: e.detail.visible,
      })
    },
    sendFeedback(e) {
      this.triggerEvent(`exhibitactionfeedback`, e.currentTarget.dataset, {bubbles: true, composed:true})
      this.setData({
        showPopover: false,
      })
    },
  }
})
