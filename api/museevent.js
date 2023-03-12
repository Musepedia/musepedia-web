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

/**
 * 获取个人报名的活动
 */
export function listEnrollment(){
  return Promise.resolve([
    {
      id: 1,
      eventName: '钱学森博物馆活动',
      phone: '13666666666',
      eventTime: '2022-4-1',
      state: 1
    },
    {
      id: 2,
      eventName: '钱学森博物馆活动5',
      phone: '13666666666',
      eventTime: '2022-5-1',
      state: 2
    },
    {
      id: 3,
      eventName: '钱学森博物馆活动55',
      phone: '13666666666',
      eventTime: '2022-6-1',
      state: 3
    },
    {
      id: 1,
      eventName: '钱学森博物馆活动',
      phone: '13666666666',
      eventTime: '2022-4-1',
      state: 1
    },
    {
      id: 1,
      eventName: '钱学森博物馆活动',
      phone: '13666666666',
      eventTime: '2022-4-1',
      state: 1
    },
    {
      id: 1,
      eventName: '钱学森博物馆活动',
      phone: '13666666666',
      eventTime: '2022-4-1',
      state: 1
    },
    {
      id: 1,
      eventName: '钱学森博物馆活动',
      phone: '13666666666',
      eventTime: '2022-4-1',
      state: 1
    },
  ])
  return axios({
    url: 'event/enrollment/list',
    method: 'get',
  });
}

export function enrollInEvent(data){
  return axios({
    url: 'event/enroll',
    method: 'post',
    data: data
  })
}