import BasePage from '../helpers/base-page'
import {queryMuseumWithDistance, queryMuseum} from '../../api/museum'
import {geoDistance} from '../../utils/util'

const app = getApp();

BasePage({
  data: {
    museumGroup: ['上海'],
    activeMuseumGroup: 0,
    museumList: [],
    currentMuseumId: 0,
  },
  onShow: function () {
    this.setData({
      currentMuseumId: app.getCurrentMuseumId()
    })
    queryMuseum({}).then(data => {
      this.setData({
        museumList: data
      })
      // 获取博物馆列表之后获取用户位置信息
      return app.getUserLocation()
    }).then(loc => {
      this.data.museumList.forEach(museum => {
        if(museum.latitude && museum.longitude){
          const dist = geoDistance(loc[1], loc[0], museum.latitude, museum.longitude);
          museum.distance = dist;
          museum.distanceStr = dist < 1 ? (diste * 1000).toFixed() + 'm' : dist.toFixed(1) + 'km';
        }
      }); 
      this.setData({
        museumList: this.data.museumList
      })
    }).catch(ignore => {})
  },
  onHide: function () {},
  switchActiveMuseumGroup({detail = 0}){
    this.setData({
      activeMuseumGroup: detail
    })
  },
  switchCurrentMuseum({currentTarget}){
    const museum = currentTarget.dataset.museum;
    if(museum.service){
      const museumId = museum.id;
      app.setCurrentMuseumId(museumId);
      this.setData({
        currentMuseumId: museumId
      })
    }
  },
  completeSetting(){
    wx.navigateBack();
  }
})