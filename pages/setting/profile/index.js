import BasePage from '../../helpers/base-page'
import {updateUserProfile} from '../../../api/user'

const app = getApp();

const m = (e, i) => {
  return {
    text: e,
    value: i + 1
  }
};
const genderColumns = ['男', '女', '其他'].map(m);
const ageColumns = ['学龄前','幼儿园','小学','初中','高中','成人'].map(m);
const genderDict = {}, ageDict = {};
genderColumns.forEach(e => genderDict[e.value] = e.text);
ageColumns.forEach(e => ageDict[e.value] = e.text);

BasePage({
  data: {
    userInfo: {
      avatarUrl: '',
      nickname: '',
      gender: 1,
      age: 1
    },
    nickname: '',
    // 选择器
    genderColumns: genderColumns,
    ageColumns: ageColumns,
    genderDict: genderDict,
    ageDict: ageDict,
    //
    currentPicker: '',
    showPopup: false,
    loading: false,
  },
  onShow() {
    const userInfo = app.globalData.userInfo;
    this.setData({
      userInfo: {
        avatarUrl: userInfo.avatarUrl,
        nickname: userInfo.nickname,
        gender: userInfo.gender || 1,
        age: userInfo.age || 1,
      },
      nickname: userInfo.nickname
    });
  },
  closePopup(){
    this.setData({
      showPopup: false
    })
  },
  showPicker(e){
    this.setData({
      showPopup: true,
      currentPicker: e.target.dataset.picker
    })
  },
  confirmPicker(e){
    const {value} = e.detail;
    const property = e.target.dataset.property;
    if(!property) {
      return;
    }
   
  },
  chooseAvatar({detail}){
    console.log(data);
  },
  updateProfile(){
    this.data.userInfo.nickname = this.data.nickname;
    this.setData({loading: true})
    app.updateUserInfo(this.data.userInfo).then(() => {
      this.setData({
        showPopup: false
      })
      wx.Toast.success('已更新用户信息')
    }).catch(e => {
      wx.Toast.fail('更新用户信息失败，请稍后重试')
    }).finally(() => {
      this.setData({loading: false})
    })
  }
})