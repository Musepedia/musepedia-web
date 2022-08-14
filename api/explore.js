import axios from '../utils/axios'

export function getExhibits(count){
  return axios({
    // url: 'explore/exhibit',
    url: 'exhibit/random',
    method: 'get',
    params: {
      count: count
    }
  })
}

export function getRecommendQuestion(params){
  return axios({
    // url: 'explore/question',
    url: 'recommendation',
    method: 'get',
    params: params
  })
}

