// pages/explore/index.js
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
      setTimeout(() => {
        this.setData({
          recommendations: this.data.recommendations.concat('FFF'),
          loading: false,
          refresherEnabled: true
        })
      }, 2000)
    }
  },
  onRefresh(){
    setTimeout(() => {
      let a = [];
      for(let i =0;i<16;i++) a.push('asd');
      this.setData({
        recommendations: a,
        refreshing: false,
        refresherEnabled: true
      })
    }, 2000)
  }

})