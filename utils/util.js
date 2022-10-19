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

export function geoDistance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist * 1.609344;
	}
}

export default {
  formatTime,
  wxLogin,
  wxLoginWithBackend,
  geoDistance
}
