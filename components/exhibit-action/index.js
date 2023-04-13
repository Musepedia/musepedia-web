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
    liked: 0,
    likeIcon: '/assets/icons/like.svg',
    likeColor: '',
    dislikeIcon: '/assets/icons/dislike.svg',
    dislikeColor: '',
    showPopover: false
  },
  methods: {
    triggerFeedback(liked){
      const origin = this.data.liked
      var likedData = 0
      var likeIcon = '/assets/icons/like.svg'
      var dislikeIcon = '/assets/icons/dislike.svg'
      var trigger = false
      if (origin !== 1 && liked) {
        // like
        likeIcon = '/assets/icons/like_fill.svg'
        likedData = 1
        trigger = true
      } else if (origin !== -1 && !liked) {
        // dislike
        dislikeIcon = '/assets/icons/dislike_fill.svg'
        likedData = -1
        trigger = true
      }
      this.setData({
        liked: likedData,
        likeIcon: likeIcon,
        dislikeIcon: dislikeIcon
      })
      if(trigger){
        this.triggerEvent('exhibitactionfeedback', {feedback: liked}, {bubbles: true, composed:true})
      }
    },
    onActionTap(e){
      const action = e.currentTarget.dataset.action;
      if(action === 'like'){
        this.triggerFeedback(true);
        return
      }  else if(action === 'dislike') {
        this.triggerFeedback(false);
        return
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
