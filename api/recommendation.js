import axios from '../utils/axios'

export function getRecommendation(count){
  return axios({
    url: 'recommendation',
    method: 'get',
    params: {
      count: count
    }
  })
}