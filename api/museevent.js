import axios from '../utils/axios'

export function getMuseEvent(id){
  return Promise.resolve({
    id: 1,
    name: '4月1日钱学森图书馆活动报名',
    description: '本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题本次活动以xx为主题',
    link: '',
    img: 'https://static.musepedia.cn/2023/qxs.png',
    startTime: new Date().getTime(),
    endTime: new Date().getTime() + 100000000,
  })
  return axios({
    url: 'event/info',
    method: 'get',
    params: {
      id: id
    }
  });
}

/**
 * 获取报名参加活动情况（报名/未报名）
 * @param {*} id 活动id 
 */
export function enrollmentInfo(id){
  return axios({
    url: 'event/enrollment',
    method: 'get',
    params: {
      id: id
    }
  });
}

export function enrollInEvent(data){
  return axios({
    url: 'event/enroll',
    method: 'post',
    data: data
  })
}