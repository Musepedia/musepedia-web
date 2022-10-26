// pages/explore/index.js
import BasePage from '../helpers/base-page'
import {getExhibits} from '../../api/explore'

const app = getApp();

BasePage({
  data: {
    loading: false,
    refreshing: false,
    refresherEnabled: false,
    recommendations: [],
    currentMuseumId: null,
    currentMuseumInfo: {},
    // ui
    cardDescriptionHidden: false, 
    cardDescriptionHeight: 'auto',
    descriptionOriginHeight: undefined,
    showMuseumDetail: false
  },
  onLoad: function (options) {},
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
    // set current museum info
    const newMuseumId = app.getCurrentMuseumId();
    if(newMuseumId !== this.data.currentMuseumId){
      this.setData({
        currentMuseumId: newMuseumId
      })
      if(!newMuseumId){
        this.setData({
          recommendations: []
        })
        return;
      }
      this.onRefresh();
      app.getCurrentMuseumInfo().then(data => {
        this.setData({
          currentMuseumInfo: data
        });
        // get origin height
          this.createSelectorQuery()
              .select('.description-content')
              .boundingClientRect()
              .exec(e => {
                this.setData({
                  // '场馆介绍'的高度27px
                  descriptionOriginHeight: e[0].height + 27 + 'px'
                });
                this.setCardDescriptionHidden(false);
              });
      })
    }
  },
  onHide: function () {},
  onUnload: function () {
    
  },
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
    if(!this.data.currentMuseumId){
      return;
    }

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
    if(!this.data.currentMuseumId){
      return;
    }
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
  },
  toggleMuseumDetail(){
    this.setData({
      showMuseumDetail: !this.data.showMuseumDetail
    })
  }
})