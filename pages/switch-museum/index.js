import {listMuseum} from '../../api/museum'

const app = getApp();

Page({
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
    listMuseum().then(data => {
      // todo order by distance
      this.setData({
        museumList: data
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
    
  }
})