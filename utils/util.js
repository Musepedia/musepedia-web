import {userLogin} from '../api/user'

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export function wxLogin(){
  const p1 = new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err)
      }
    })
  })
  const p2 = new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  })
  return Promise.all([p1, p2]);
}

export function wxLoginWithBackend(data){
  return wxLogin().then(res => {
    const body = {
      code: res[0].code,
      encryptedData: res[1].encryptedData,
      iv: res[1].iv,
      avatarUrl: res[1].userInfo.avatarUrl,
      nickname: res[1].userInfo.nickName,
    }
    Object.assign(body, data);
    return userLogin(body);
  })
}

export default {
  formatTime,
  wxLogin,
  wxLoginWithBackend
}
