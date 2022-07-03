// pages/explore/index.js
import {getExhibits} from '../../api/explore'

Page({
  data: {
    keyword: '',
    loading: false,
    refreshing: false,
    refresherEnabled: false,
    recommendations: [

    ],
    // ui
    cardDescriptionHidden: false, 
    cardDescriptionHeight: 'auto',
    descriptionOriginHeight: undefined
  },
  onLoad: function (options) {

  },
  onReady: function () {},
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1,
      });
    };
    if(!getApp().checkLogin(true)){
      return;
    }
    if(this.data.recommendations.length === 0){
      this.onRefresh();
    }
    // get origin height
    if(this.data.descriptionOriginHeight === undefined){
      this.createSelectorQuery()
          .select('.museum-card-description')
          .boundingClientRect()
          .exec(e => {
            this.setData({
              descriptionOriginHeight: e[0].height + 'px'
            });
            this.setCardDescriptionHidden(false);
          });
    }
  },
  onHide: function () {},
  onUnload: function () {},
  switchMuseum(){
    wx.navigateTo({
      url: '/pages/switch-museum/index',
    })
  },
  intoDetail(e){
    const data = e.currentTarget.dataset.data;
    wx.navigateTo({
      url: '/pages/exhibit-detail/index',
      success(res){
        res.eventChannel.emit('exhibitData', data)
      }
    })
  },
  onScrollToLower(){
    if(!this.data.loading){
      this.setData({
        loading: true,
        refresherEnabled: false
      });
      getExhibits(4).then(data => {
        console.log(data);
        this.setData({
          recommendations: this.data.recommendations.concat(data),
        })
      }).catch(ignore => {}).finally(() => {
        this.setData({
          loading: false,
          refresherEnabled: true
        })
      })
    }
  },
  onRefresh(){
    getExhibits(16).then(data => {
      this.setData({
        recommendations: data
      })
    }).catch(ignore => {}).finally(() => {
      this.setData({
        refreshing: false,
        refresherEnabled: true
      })
    })
  },
  // ui related
  onRecommendScroll(e){
    const scrollTop = e.detail.scrollTop;
    if(e.detail.deltaY < 0){
      this.setCardDescriptionHidden(true);
    }
  },
  toggleCardDescriptionHidden(){
    this.setCardDescriptionHidden(!this.data.cardDescriptionHidden)
  },
  setCardDescriptionHidden(hidden){
    this.setData({
      cardDescriptionHidden: hidden,
      cardDescriptionHeight: hidden ? 0 : this.data.descriptionOriginHeight
    });
  }
})