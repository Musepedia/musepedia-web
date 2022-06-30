// pages/explore/index.js
import {getRecommendation} from '../../api/recommendation'

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
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {
    this.onRefresh();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1,
      });
    };
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
  fetchData(count = 8){
    return getRecommendation(count).then(data => {
      data.forEach(e => {
        e.isImage = (e.answerType === 2 || e.answerText.startsWith("htto://") || e.answerText.startsWith("https://"))
      })
      return data;
    }).catch(ignore => {});
  },
  onScrollToLower(){
    if(!this.data.loading){
      this.setData({
        loading: true,
        refresherEnabled: false
      });
      this.fetchData(4).then(data => {
        console.log(data);
        this.setData({
          recommendations: this.data.recommendations.concat(data),
        })
      }).finally(() => {
        this.setData({
          loading: false,
          refresherEnabled: true
        })
      })
    }
  },
  onRefresh(){
    this.fetchData(16).then(data => {
      this.setData({
        recommendations: data
      })
    }).finally(() => {
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