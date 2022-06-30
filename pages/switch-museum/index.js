// pages/switch-museum/index.js
Page({
  data: {
    museumGroup: ['附近','上海','浙江'],
    activeMuseumGroup: 0,
    museumList: [],
    currentMuseumId: 0,
  },
  onShow: function () {
    const mu = [
      {
        name: '长风商标海报',
        distance: '1.8km',
        location: '普陀',
        active: true,
      },
      {
        name: '上海艺术品博博博博博博物馆',
        distance: '2.3km',
        location: '天山',
        active: false
      },
      {
        name: '上海海海海海海海海艺术品博物馆',
        distance: '33.2km',
        location: '天天天天天山',
        active: false
      },
      {
        name: '上海自然博物馆',
        distance: '5.7km',
        location: '北京西路',
        active: true
      },
      {
        name: '世博会博物馆',
        distance: '8.5km',
        location: '鲁班路',
        active: false
      }
    ];
    mu.push(...mu.slice())
    mu.forEach((e,i) => {
      e.id = i;
      if(i === 0){
        e.tag = '距离最近'
      }
      if(!e.active){
        e.tag = '暂不可用'
      }
    });
    this.setData({
      museumList: mu
    })
  },
  onHide: function () {

  },
  switchActiveMuseumGroup({detail = 0}){
    this.setData({
      activeMuseumGroup: detail
    })
  },
  switchCurrentMuseum({currentTarget}){
    const museum = currentTarget.dataset.item;
    if(museum.active){
      const museumId = museum.id;
      wx.setStorageSync('currentMuseumId', museumId);
      this.setData({
        currentMuseumId: museumId
      })
    }
    
  }
})