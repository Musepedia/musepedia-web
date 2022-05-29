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
    likeColor: ''
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
      if(action === 'Like'){
        this.toggleLikeStatus();
      }
      this.triggerEvent(`exhibitAction${action}`, {}, {bubbles: true, composed:true})
    }
  }
})
