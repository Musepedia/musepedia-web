// components/exhibit-action/index.js
Component({
  properties: {
    iconSize: {
      type: String,
      value: '20px'
    },
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
    hide(e) {
      this.setData({
        showPopover: false,
      })
    },
  }
})
