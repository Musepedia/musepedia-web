// pages/explore/index.js
import {getRecommendation} from '../../api/recommendation'

Page({
  data: {
    keyword: '',
    loading: false,
    refreshing: false,
    refresherEnabled: false,
    recommendations: [

    ]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    this.onRefresh();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1,
      });
    };
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onScrollToLower(){
    if(!this.data.loading){
      this.setData({
        loading: true,
        refresherEnabled: false
      })
      getRecommendation(4).then(data => {
        this.setData({
          recommendations: this.data.recommendations.concat(data),
          loading: false,
          refresherEnabled: true
        })
      }).catch(ignore => {})
    }
  },
  onRefresh(){
    getRecommendation(16).then(data => {
      this.setData({
        recommendations: data,
        refreshing: false,
        refresherEnabled: true
      })
    }).catch(ignore => {})
  }
})