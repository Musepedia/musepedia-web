import BasePage from '../helpers/base-page'
import {getRandomExhibits} from '../../api/exhibit'
import {updateUserPreference} from '../../api/setting'

const app = getApp();

BasePage({
  data: {
    preferenceSettings: [[]],
    selectedExhibits: {}, // 勾选的展品，用于class
    selectedExhibitionHalls: {}, // 实际选择的展厅id
    currentIndex: 0, // page index
    hideSkipButton: false,
    currentMuseumId: null
  },
  onLoad: function (options) {
    this.setData({
      hideSkipButton: !!options.hideSkipButton
    })
  },
  onReady: function () {},
  onShow: function () {
    getRandomExhibits().then(data => {
      // init hall ids
      data.forEach(e => this.data.selectedExhibitionHalls[e.exhibitionHall.id] = 0);

      const itemPerPage = 6;
      const pages = [];
      const pageAmount = data.length / itemPerPage;
      for(let i = 0; i < pageAmount; i++){
        pages.push(data.splice(0, itemPerPage));
      }
      this.setData({
        preferenceSettings: pages
      })
    }).catch(ignore => {});

    this.setData({
      currentMuseumId: app.getCurrentMuseumId()
    })
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  previousPage(){
    this.changePage(this.data.currentIndex - 1);
  },
  nextPage(){
    this.changePage(this.data.currentIndex + 1);
  },
  settingPageChange({detail}){
    this.changePage(detail.current);
  },
  changePage(index){
    if(index >= 0 && index < this.data.preferenceSettings.length){
      this.setData({
        currentIndex: index
      })
    }
  },
  completeSetting(){
    const selectedHallIds = Object.entries(this.data.selectedExhibitionHalls).filter(e => e[1]).map(e => e[0]);
    updateUserPreference(selectedHallIds).then(data => {
      wx.Toast.success('设置已保存');
      setTimeout(() => wx.navigateBack(), 700);
    }).catch(ignore => {});
  },
  settingItemTap(e){
    const data = e.currentTarget.dataset;
    this.data.selectedExhibitionHalls[data.hallId] += 
      (this.data.selectedExhibits[data.name] = !this.data.selectedExhibits[data.name]) ? 1 : -1;
    this.setData({
      selectedExhibits: this.data.selectedExhibits
    })
  }
})